import {
  MEMBERSHIP_PRODUCT_TYPE_KEY,
  ProductTypeValues,
  USER_FIREBASE_EMAIL_KEY,
  USER_FIREBASE_ID_KEY
} from "business-layer/utils/StripeProductMetadata"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import UserDataService from "data-layer/services/UserDataService"
import { UserRecord } from "firebase-admin/auth"
import Stripe from "stripe"
import AuthService from "./AuthService"
import BookingDataService from "data-layer/services/BookingDataService"
import {
  CheckoutTypeValues,
  CHECKOUT_TYPE_KEY,
  BOOKING_SLOTS_KEY,
  START_DATE,
  END_DATE
} from "business-layer/utils/StripeSessionMetadata"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import console from "console"
import MailService from "./MailService"
import BookingUtils from "../utils/BookingUtils"

const stripe = new Stripe(process.env.STRIPE_API_KEY)

const ONE_MINUTE_S = 60

/**
 * @warning Stripe uses seconds for its timestamp, while `Date.now()` gives the UTC epoch in `ms`
 */
const dateNowSecs = () => {
  return Math.ceil(Date.now() / 1000)
}

export default class StripeService {
  public async getAllProducts(limit?: number, startingAfter?: string) {
    const products = await stripe.products.list({
      limit,
      starting_after: startingAfter
    })
    return products.data
  }

  public async getCheckoutSessionById(sessionId: string) {
    return await stripe.checkout.sessions.retrieve(sessionId)
  }

  public async getProductById(id: string) {
    return await stripe.products.retrieve(id)
  }

  public async getProductByMetadata(key: string, value: string) {
    const result = await stripe.products.search({
      query: `metadata['${key}']:'${value}'`
    })
    return result.data
  }

  /**
   * Creates a new Stripe customer if it doesn't exist and sets the Stripe customer id to the user info after creation.
   * @param user, user data extracted from JWT
   *
   * @returns `newUser` as true if they already have a stripe id alongside their `stripe_id`,
   * false otherwise with the newly created `stripe_id`
   */
  public async createCustomerIfNotExist(
    user: UserRecord,
    userData: UserAdditionalInfo,
    userDataService: UserDataService
  ) {
    if (userData.stripe_id) {
      // pre-existing user
      return {
        newUser: false,
        stripeCustomerId: userData.stripe_id
      }
    } else {
      // need to create a new user
      const { first_name, last_name } = userData
      const { uid, email } = user
      const displayName = `${first_name} ${last_name} ${email}`
      const { id } = await this.createNewUser(displayName, email, uid)
      await userDataService.editUserData(uid, { stripe_id: id })
      return {
        newUser: true,
        stripeCustomerId: id
      }
    }
  }

  /**
   *
   * @param email ideally extracted from JWT
   * @param uid ideally extracted from JWT
   */
  public async createNewUser(displayName: string, email: string, uid: string) {
    return await stripe.customers.create({
      name: displayName,
      metadata: {
        [USER_FIREBASE_ID_KEY]: uid,
        [USER_FIREBASE_EMAIL_KEY]: email
      }
    })
  }

  /**
   *
   * Checks for processing payments from a user. Used to avoid
   * users from double paying after completing a checkout session for membership payments.
   *
   * @param customerId `stripe_id` from the firebase document
   * @param createdMinutesAgo how long ago to check for checkout sessions
   * @returns true if user has completed checkout session from a default `2` minutes ago
   */
  public async hasRecentlyCompletedCheckoutSession(
    customerId: string,
    createdMinutesAgo: number = 2
  ) {
    const { data } = await stripe.checkout.sessions.list({
      customer: customerId,
      created: {
        gte: dateNowSecs() - createdMinutesAgo * ONE_MINUTE_S
      }
    })
    const hasRecentlyCompletedCheckoutSession = !!data.find(
      (session) => session.status === "complete"
    )
    return hasRecentlyCompletedCheckoutSession
  }

  /**
   * Used to return active payment sessions for user in the case of one session only payments (i.e memberships or bookings)
   * I.e to avoid creating excessive sessions
   * For events or payments that allow multiple sessions this method should NOT be used
   * @param customerId of the user (extracted from firebase doc)
   * @param sessionType defined as the enum CheckoutTypeValues, only exists for `membership` and `booking` right now
   *
   * Will return undefined if no sessions found
   */
  public async getActiveSessionForUser(
    customerId: string,
    sessionType: CheckoutTypeValues
  ): Promise<Stripe.Checkout.Session> {
    const { data } = await stripe.checkout.sessions.list({
      customer: customerId
    })
    const currentlyActiveSession = data.find(
      (session) =>
        session.metadata[CHECKOUT_TYPE_KEY] === sessionType &&
        session.status === "open"
    )
    // Might be undefined
    return currentlyActiveSession
  }

  /**
   * Used to return recent active payment sessions in the case of one session only payments (i.e memberships or bookings)
   * I.e to reduce available slots due to pending payments
   * @param sessionType defined as the enum CheckoutTypeValues, only exists for `membership` and `booking` right now
   * @param createdMinutesAgo how long ago to check for checkout sessions
   * @param shouldPaginate keep fetching active sessions until none left (do not specify if not needed)
   *
   * Will return undefined if no sessions found
   */
  public async getRecentActiveSessions(
    sessionType: CheckoutTypeValues,
    createdMinutesAgo?: number,
    shouldPaginate: boolean = false
  ): Promise<Stripe.Checkout.Session[]> {
    let { data, has_more } = await stripe.checkout.sessions.list({
      created: {
        gte: createdMinutesAgo
          ? dateNowSecs() - createdMinutesAgo * ONE_MINUTE_S
          : undefined
      },
      limit: 100
    })

    if (shouldPaginate && has_more) {
      while (has_more) {
        const response = await stripe.checkout.sessions.list({
          created: {
            gte: createdMinutesAgo
              ? dateNowSecs() - createdMinutesAgo * ONE_MINUTE_S
              : undefined
          },
          starting_after: data[data.length - 1].id,
          limit: 100
        })

        data = [...data, ...response.data]
        has_more = response.has_more
      }
    }

    const recentActiveSessions = data.filter(
      (session) =>
        session.metadata[CHECKOUT_TYPE_KEY] === sessionType &&
        session.status === "open"
    )
    return recentActiveSessions
  }

  public async createProduct(
    name: string,
    metadata: Stripe.MetadataParam,
    active: boolean,
    description: string,
    default_price_data: Stripe.ProductCreateParams.DefaultPriceData
  ): Promise<Stripe.Response<Stripe.Product>> {
    let product
    try {
      product = await stripe.products.create({
        name,
        metadata,
        active,
        description,
        default_price_data
      })
    } catch (err) {
      console.error("Error creating product", err)
      throw err
    }

    return product
  }

  /**
   * Fetches a checkout session associated with a given payment intent ID.
   * @param payment_intent The payment intent used to pay for this checkout session.
   * @returns The checkout session associated with this payment.
   */
  public async retrieveCheckoutSessionFromPaymentIntent(
    payment_intent: string
  ): Promise<Stripe.Checkout.Session> {
    const sessions = await stripe.checkout.sessions.list({
      payment_intent
    })
    if (sessions.has_more) {
      throw new Error(
        `Fetching checkout session from payment intent yielded more than expected sessions`
      )
    }

    return sessions.data[0]
  }

  /**
   *
   * @param client_reference_id generally firebase id
   * @param email ideally extracted from user JWT
   * @param return_url
   * @param line_item format `{price: <price id of item>, quantity: X}`
   * @param metadata KVP of metadata
   * @param expires_after_mins Must be over 30 and under 24 hours (1140) we default to 31 minutes
   * @param custom_text Object representing [extra text](https://docs.stripe.com/payments/checkout/customization) that the user may need to see
   * @returns client secret
   */
  public async createCheckoutSession(
    client_reference_id: string,
    return_url: string,
    line_items: {
      price: string
      quantity: number
    }[],
    metadata: Record<string, string>,
    customer_id: string,
    expires_after_mins: number = 31,
    custom_text?: Stripe.Checkout.SessionCreateParams.CustomText,
    allow_promotion_codes: boolean = false
  ) {
    const session = await stripe.checkout.sessions.create({
      // consumer changeable
      client_reference_id,
      return_url,
      customer: customer_id,
      line_items,
      metadata,
      // configured internally and should not change
      ui_mode: "embedded",
      mode: "payment",
      currency: "NZD",
      expires_at: dateNowSecs() + expires_after_mins * ONE_MINUTE_S,
      custom_text,
      allow_promotion_codes
    })
    return session.client_secret
  }

  /**
   * Updates a product with the specified fields.
   *
   * @param productId - The ID of the product to update.
   * @param updateFields - An object containing the fields to update.
   * @param updateFields.active - (Optional) Whether the product is active or not.
   * @param updateFields.description - (Optional) The description of the product.
   * @param updateFields.metadata - (Optional) Additional metadata for the product.
   * @param updateFields.price - (Optional) The price of the product.
   * @param updateFields.name - (Optional) The name of the product.
   *
   * @returns {Promise<Stripe.Product>} - A promise that resolves to the updated product.
   */
  public async updateProduct(
    productId: string,
    updateFields: {
      active?: boolean
      description?: string
      metadata?: Record<string, string>
      price?: string
      name?: string
    }
  ): Promise<Stripe.Product> {
    /** Create an empty object to store the product update parameters */
    const productUpdateParams: Stripe.ProductUpdateParams = {}

    /** Check if the 'active' field is provided and assign it to the productUpdateParams object */
    if (updateFields.active !== undefined) {
      productUpdateParams.active = updateFields.active
    }

    /** Check if the 'description' field is provided and assign it to the productUpdateParams object */
    if (updateFields.description !== undefined) {
      productUpdateParams.description = updateFields.description
    }

    /** Check if the 'metadata' field is provided and assign it to the productUpdateParams object */
    if (updateFields.metadata !== undefined) {
      productUpdateParams.metadata = updateFields.metadata
    }

    /** Check if the 'price' field is provided and assign it to the productUpdateParams object */
    if (updateFields.price !== undefined) {
      productUpdateParams.default_price = updateFields.price
    }

    /** Check if the 'name' field is provided and assign it to the productUpdateParams object */
    if (updateFields.name !== undefined) {
      productUpdateParams.name = updateFields.name
    }

    /** Update the product with the specified ID using the productUpdateParams object */
    const updatedProduct = await stripe.products.update(
      productId,
      productUpdateParams
    )

    /** Return the updated product
     *
     * @returns
     */
    return updatedProduct
  }

  /** Fetch all active products from Stripe
   * @returns membershipProducts - An array of active membership products from Stripe
   */
  public async getActiveMembershipProducts() {
    try {
      const products = await stripe.products.list({
        active: true,
        expand: ["data.default_price"]
      })
      // Filter products with the required metadata
      const membershipProducts = products.data.filter(
        (product) =>
          product.metadata[MEMBERSHIP_PRODUCT_TYPE_KEY] ===
          ProductTypeValues.MEMBERSHIP
      )
      return membershipProducts
    } catch (error) {
      console.error("Error fetching Stripe products:", error)
      throw error
    }
  }

  /**
   * Promotes a user from guest to member status.
   * @param uid The user ID to promote to a member.
   * @returns A promise that resolves once the user has been promoted.
   */
  public async handleMembershipPaymentSession(uid: string) {
    const authService = new AuthService()

    await authService.setCustomUserClaim(uid, "member")
  }

  /**
   * Handles a booking payment session by creating the booking for the user.
   * @param uid The user ID to award the booking session.
   * @param session The Stripe session the user bought.
   */
  public async handleBookingPaymentSession(
    uid: string,
    session: Stripe.Checkout.Session
  ) {
    if (!(BOOKING_SLOTS_KEY in session.metadata)) {
      throw new Error(
        `Booking session '${session.id}' from user '${uid}' did not contain a BOOKING_SLOT_KEY`
      )
    }
    const bookingSlotsJson = session.metadata[BOOKING_SLOTS_KEY]
    const bookingSlotIds = JSON.parse(bookingSlotsJson) as Array<string>

    const bookingDataService = new BookingDataService()
    const bookingSlotService = new BookingSlotService()

    await Promise.all(
      bookingSlotIds.map(async (bookingSlotShortId) => {
        const bookingSlotId = (
          await bookingSlotService.getBookingSlotById(bookingSlotShortId)
        ).id

        await bookingDataService.createBooking({
          booking_slot_id: bookingSlotId,
          stripe_payment_id: session.id,
          user_id: uid
        })

        // Check if the last spot is taken and expire other sessions
        const isLastSpot = await BookingUtils.isLastSpotTaken(bookingSlotId)
        if (isLastSpot) {
          await this.expireOtherCheckoutSessions(bookingSlotId)
        }
      })
    )
    /**
     * Send confirmation email to the user
     */
    try {
      const [userAuthData] = await new AuthService().bulkRetrieveUsersByUids([
        { uid }
      ])

      await new MailService().sendBookingConfirmationEmail(
        userAuthData.email,
        session.metadata[START_DATE],
        session.metadata[END_DATE]
      )
    } catch (error) {
      console.error(`Failed to send an email to the user ${uid}`, error)
    }
  }

  private async expireOtherCheckoutSessions(
    bookingSlotId: string
  ): Promise<void> {
    try {
      // Fetch all checkout sessions for the specific booking slot id
      const sessions = await this.getRecentActiveSessions(
        CheckoutTypeValues.BOOKING,
        1440
      )

      const sessionsToExpire = sessions.filter((session) => {
        const bookingSlots = JSON.parse(
          session.metadata[BOOKING_SLOTS_KEY]
        ) as Array<string>
        return bookingSlots.includes(bookingSlotId)
      })

      // Expire each session that matches the booking slot id
      await Promise.all(
        sessionsToExpire.map(async (session) => {
          if (session.id) {
            await stripe.checkout.sessions.expire(session.id)
          }
        })
      )

      console.log(
        `[WEBHOOK] Expired ${sessionsToExpire.length} sessions for booking slot ${bookingSlotId}`
      )
    } catch (err) {
      console.error(`[WEBHOOK] Error expiring checkout sessions: ${err}`)
    }
  }

  public async addCouponToUser(
    stripeId: string,
    amount: number
  ): Promise<void> {
    try {
      const coupon = await stripe.coupons.create({
        amount_off: amount * 100, // to cents
        currency: "nzd"
      })

      await stripe.promotionCodes.create({
        coupon: coupon.id,
        customer: stripeId
      })
    } catch (e) {
      throw new Error("Failed to add coupon to user")
    }
  }
}

import StripeService from "business-layer/services/StripeService"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  BOOKING_SLOTS_KEY,
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues,
  END_DATE,
  START_DATE
} from "business-layer/utils/StripeSessionMetadata"
import {
  MembershipTypeValues,
  MEMBERSHIP_TYPE_KEY,
  LODGE_PRICING_TYPE_KEY,
  type LodgePricingTypeValues
} from "business-layer/utils/StripeProductMetadata"
import {
  UTCDateToDdMmYyyy,
  firestoreTimestampToDate,
  timestampsInRange
} from "data-layer/adapters/DateUtils"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import UserDataService from "data-layer/services/UserDataService"
import type {
  UserPaymentRequestModel,
  SelfRequestModel,
  UserBookingRequestingModel
} from "service-layer/request-models/UserRequests"
import type {
  BookingPaymentResponse,
  LodgeStripeProductResponse,
  MembershipPaymentResponse,
  MembershipStripeProductResponse
} from "service-layer/response-models/PaymentResponse"
import type Stripe from "stripe"
import {
  Controller,
  Post,
  Get,
  Route,
  Request,
  Security,
  Query,
  SuccessResponse,
  Body
} from "tsoa"
import BookingUtils from "business-layer/utils/BookingUtils"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

@Route("payment")
export class PaymentController extends Controller {
  /**
   * Fetches the prices of the membership products from Stripe.
   * @returns The prices of the membership products.
   */
  @Get("membership_prices")
  public async getMembershipPrices(): Promise<MembershipStripeProductResponse> {
    const stripeService = new StripeService()
    try {
      const membershipProducts =
        await stripeService.getActiveMembershipProducts()
      // Maps the products to the required response type MembershipStripeProductResponse in PaymentResponse

      const productsValues = membershipProducts.map((product) => {
        // Checks the membership type of the product
        const membershipType = product.metadata[
          MEMBERSHIP_TYPE_KEY
        ] as MembershipTypeValues

        let name: MembershipTypeValues

        switch (membershipType) {
          case MembershipTypeValues.UoaStudent: {
            name = MembershipTypeValues.UoaStudent
            break
          }
          case MembershipTypeValues.NonUoaStudent: {
            name = MembershipTypeValues.NonUoaStudent
            break
          }
          case MembershipTypeValues.ReturningMember: {
            name = MembershipTypeValues.ReturningMember
            break
          }
          case MembershipTypeValues.NewNonStudent: {
            name = MembershipTypeValues.NewNonStudent
            break
          }
        }

        return {
          productId: product.id,
          name,
          description: product.description,
          discount: product.metadata.discount === "true",
          displayPrice: (
            Number(
              (product.default_price as Stripe.Price).unit_amount_decimal
            ) / 100
          ).toString(),
          originalPrice: product.metadata.original_price
        }
      })

      return { data: productsValues }
    } catch (error) {
      console.error(error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message: "Error fetching active Stripe products"
      }
    }
  }

  /**
   * Fetches the prices of the lodge products from Stripe.
   * @returns The prices of the lodge products.
   */
  @Get("lodge_prices")
  public async getLodgePrices(): Promise<LodgeStripeProductResponse> {
    const stripeService = new StripeService()
    try {
      const lodgeProducts = await stripeService.getActiveLodgeProducts()
      // Maps the products to the required response type LodgeStripeProductResponse in PaymentResponse
      const productsValues = lodgeProducts.map((product) => {
        // Checks the lodge type of the product
        const lodgeType = product.metadata[
          LODGE_PRICING_TYPE_KEY
        ] as LodgePricingTypeValues

        return {
          // The stripe product id
          productId: product.id,
          // The lodge booking type
          name: lodgeType,
          // The product description
          description: product.description,
          // A boolean value if there is a lodge booking discount
          discount: product.metadata.discount === "true",
          // The price of the lodge booking
          displayPrice: (
            Number(
              (product.default_price as Stripe.Price).unit_amount_decimal
            ) / 100
          ).toString(),
          // The original price of the lodge booking
          originalPrice: product.metadata.original_price
        }
      })
      this.setStatus(StatusCodes.OK)
      return { data: productsValues }
    } catch (error) {
      console.error(error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return { error: "Error fetching active Stripe products" }
    }
  }

  /**
   * Fetches the details of a checkout session based on a stripe checkout session id.
   * @param sessionId The id of the stripe checkout session to fetch.
   * @returns The details of the checkout session.
   */
  @SuccessResponse("200", "Session Fetched")
  @Security("jwt")
  @Get("checkout_status")
  public async getCheckoutSessionDetails(@Query() sessionId: string) {
    const stripeService = new StripeService()
    try {
      const session = await stripeService.getCheckoutSessionById(sessionId)
      const { status, customer_email, amount_total, metadata } = session

      return {
        status,
        customer_email,
        pricePaid: amount_total,
        metadata
      }
    } catch (e) {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return null
    }
  }

  /**
   * Creates a checkout session for membership payment.
   * @param request The user's record, this endpoint extracts the uid and customClaims to check for membership status.
   * @param requestBody The request body containing the membership type.
   * @returns The client secret of the checkout session and membership type.
   */
  @SuccessResponse("200", "Session created")
  @Security("jwt")
  @Post("membership")
  public async getMembershipPayment(
    @Request() request: SelfRequestModel,
    @Body() requestBody: UserPaymentRequestModel
  ): Promise<MembershipPaymentResponse> {
    try {
      const { uid, customClaims } = request.user
      if (customClaims && customClaims[AuthServiceClaims.MEMBER]) {
        // Can't pay for membership if already member
        this.setStatus(StatusCodes.CONFLICT)
        return { error: "Already a member" }
      }

      const stripeService = new StripeService()
      const userDataService = new UserDataService()

      const userData = await userDataService.getUserData(uid)

      /**
       * Generate customer id if required
       */
      const { newUser, stripeCustomerId } =
        await stripeService.createCustomerIfNotExist(
          request.user,
          userData,
          userDataService
        )
      if (!newUser) {
        /**
         * See if user already has active session
         */
        const activeSession = await stripeService.getActiveSessionForUser(
          stripeCustomerId,
          CheckoutTypeValues.MEMBERSHIP
        )
        if (activeSession) {
          const { client_secret, metadata } = activeSession
          this.setStatus(StatusCodes.OK)
          return {
            stripeClientSecret: client_secret,
            membershipType: metadata[
              MEMBERSHIP_TYPE_KEY
            ] as MembershipTypeValues,
            message: "Existing membership checkout session found"
          }
        }
        /**
         * See if user has recently paid -> if user didn't have a stripe id that means
         * they couldn't have a completed session
         */
        if (
          await stripeService.hasRecentlyCompletedCheckoutSession(
            stripeCustomerId
          )
        ) {
          this.setStatus(StatusCodes.CONFLICT)
          return {
            message: "Membership payment is still being processed"
          }
        }
      }

      /**
       * Check what price user is going to pay based on the details they filled in
       */
      const requiredMembership = requestBody.membershipType
      if (!requiredMembership) {
        this.setStatus(StatusCodes.NOT_FOUND)
        return {
          error: getReasonPhrase(StatusCodes.NOT_FOUND),
          message:
            "No existing session could be found, and no new session could be created because membership type was not provided"
        }
      }
      /**
       * Get required product and generate client secret
       */
      const requiredMembershipProducts =
        await stripeService.getProductByMetadata(
          MEMBERSHIP_TYPE_KEY,
          requiredMembership
        )

      // We assume there will only be one active product at a time for memberships (needs to be communicated with admins)
      const requiredMembershipProduct = requiredMembershipProducts.find(
        (product) => product.active
      )

      // Note this will throw error if undefined (product wasn't found)
      const { default_price } = requiredMembershipProduct

      const clientSecret = await stripeService.createCheckoutSession(
        uid,
        // Note if the url changes workflows need to be updated to have the deployments work correctly
        `${process.env.FRONTEND_URL}/register/confirm?session_id={CHECKOUT_SESSION_ID}`,
        [
          {
            price: default_price as string,
            quantity: 1
          }
        ],
        // Set metadata to be found in webhook later
        {
          [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.MEMBERSHIP,
          [MEMBERSHIP_TYPE_KEY]: requiredMembership
        },
        stripeCustomerId
      )
      this.setStatus(StatusCodes.OK)
      return {
        stripeClientSecret: clientSecret,
        membershipType: requiredMembership
      }
    } catch (error) {
      console.error(error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        message: "Something went wrong",
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
      }
    }
  }

  /**
   * Creates a new booking session for the date ranges passed in,
   * will return any existing sessions if they have been started in
   * the last 30 minutes (the minimum period stripe has to persist a session for)
   * @param request The user's record, the uid is used from this to identify the user.
   * @param requestBody The request body containing the date ranges for the booking.
   * @returns The client secret of the checkout session.
   */
  @SuccessResponse("200", "Created booking checkout session")
  @Security("jwt", ["member"])
  @Post("booking")
  public async getBookingPayment(
    @Request() request: SelfRequestModel,
    @Body() requestBody: UserBookingRequestingModel
  ): Promise<BookingPaymentResponse> {
    const { uid } = request.user

    // Create new Stripe checkout session
    const stripeService = new StripeService()
    const userDataService = new UserDataService()

    try {
      /**
       * Declare these with outer scope as they are used in most paths
       */
      const { startDate, endDate } = requestBody
      const userData = await userDataService.getUserData(uid)

      const { newUser, stripeCustomerId } =
        await stripeService.createCustomerIfNotExist(
          request.user,
          userData,
          userDataService
        )

      /**
       * The amount of time users have to complete a session
       */
      const THIRTY_MINUTES_MS = 1800000

      // If not a new Stripe customer, we want to check for pre-existing bookings
      if (!newUser) {
        const activeSession = await stripeService.getActiveSessionForUser(
          stripeCustomerId,
          CheckoutTypeValues.BOOKING
        )
        if (activeSession) {
          const sessionStartTime = new Date(
            activeSession.created * 1000 + THIRTY_MINUTES_MS
          ).toLocaleTimeString("en-NZ")

          this.setStatus(StatusCodes.OK)
          return {
            stripeClientSecret: activeSession.client_secret,
            message: `Existing booking checkout session found for the nights ${activeSession.metadata[START_DATE] || ""} to ${activeSession.metadata[END_DATE] || ""}, you may start a new one after ${sessionStartTime} (NZST)`
          }
        }
      }

      // The request start and end dates
      if (
        !startDate ||
        !endDate ||
        BookingUtils.hasInvalidStartAndEndDates(
          startDate,
          endDate,
          // Current timestamp
          new Date(),
          new Date()
        )
      ) {
        this.setStatus(StatusCodes.BAD_REQUEST)
        return {
          error:
            "Invalid date, booking start date and end date must be in the range of today up to a year later. "
        }
      }

      const dateTimestampsInBooking = timestampsInRange(startDate, endDate)
      const totalDays = dateTimestampsInBooking.length

      /**
       * Used for formatted display to user
       */
      const BOOKING_START_DATE = UTCDateToDdMmYyyy(
        new Date(firestoreTimestampToDate(dateTimestampsInBooking[0]))
      )

      /**
       * Used for formatted display to user
       */
      const BOOKING_END_DATE = UTCDateToDdMmYyyy(
        new Date(
          firestoreTimestampToDate(dateTimestampsInBooking[totalDays - 1])
        )
      )

      const MAX_BOOKING_DAYS = 10
      // Validate number of dates to avoid kiddies from forging bookings
      if (totalDays > MAX_BOOKING_DAYS) {
        this.setStatus(StatusCodes.BAD_REQUEST)
        return {
          error: "Invalid date range, booking must be a maximum of 10 days. "
        }
      }
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )

      if (bookingSlots.length !== totalDays) {
        this.setStatus(StatusCodes.LOCKED) // Resource busy
        return {
          error: "No booking slot available for one or more dates."
        }
      }

      const baseAvailabilities =
        await bookingDataService.getAvailabilityForUser(
          uid,
          dateTimestampsInBooking,
          bookingSlots
        )
      if (baseAvailabilities.some((slot) => !slot)) {
        this.setStatus(StatusCodes.CONFLICT)
        return {
          error: "User has already booked a slot or there is no availability"
        }
      }

      const MINUTES_AGO = 32 // To be safe
      // Lets check for open sessions here:
      const openSessions = await stripeService.getRecentActiveSessions(
        CheckoutTypeValues.BOOKING,
        MINUTES_AGO,
        true
      )

      const currentlyInCheckoutSlotIds = openSessions.flatMap((session) =>
        JSON.parse(session.metadata[BOOKING_SLOTS_KEY])
      ) as Array<string>

      const slotOccurences = BookingUtils.getSlotOccurences(
        currentlyInCheckoutSlotIds
      )

      const outOfStockBecauseSessionActive = baseAvailabilities.some(
        (availability) =>
          availability.baseAvailability -
            (slotOccurences.get(availability.id) || 0) <=
          0
      )

      if (outOfStockBecauseSessionActive) {
        this.setStatus(StatusCodes.CONFLICT)
        return {
          error:
            "Someone may currently have this item in cart, please try again later"
        }
      }

      // implement pricing logic
      const requiredBookingType = BookingUtils.getRequiredPricing(
        dateTimestampsInBooking
      )

      const requiredBookingProducts = await stripeService.getProductByMetadata(
        LODGE_PRICING_TYPE_KEY,
        requiredBookingType
      )
      const requiredBookingProduct = requiredBookingProducts.find(
        (product) => product.active
      )
      const { default_price } = requiredBookingProduct

      const clientSecret = await stripeService.createCheckoutSession(
        uid,
        `${process.env.FRONTEND_URL}/bookings/success?session_id={CHECKOUT_SESSION_ID}&startDate=${BOOKING_START_DATE}&endDate=${BOOKING_END_DATE}`,
        [
          {
            price: default_price as string,
            quantity: totalDays
          }
        ],
        {
          [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.BOOKING,
          [LODGE_PRICING_TYPE_KEY]: requiredBookingType,
          [BOOKING_SLOTS_KEY]: JSON.stringify(
            bookingSlots.map((slot) => slot.id)
          ),
          [START_DATE]: BOOKING_START_DATE,
          [END_DATE]: BOOKING_END_DATE
        },
        stripeCustomerId,
        undefined,
        {
          submit: {
            message: `By clicking Pay you agree to booking the nights from ${BOOKING_START_DATE} to ${BOOKING_END_DATE}`
          }
        },
        true
      )
      this.setStatus(StatusCodes.OK)
      return {
        stripeClientSecret: clientSecret,
        message: `You have until ${new Date(Date.now() + THIRTY_MINUTES_MS).toLocaleTimeString("en-NZ")} to pay for the nights ${BOOKING_START_DATE} to ${BOOKING_END_DATE}`
      }
    } catch (e) {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      console.error("Something went wrong when creating the booking session", e)
      return {
        error: "Something went wrong when creating the booking session"
      }
    }
  }
}

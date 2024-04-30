import {
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues,
  USER_FIREBASE_EMAIL_KEY,
  USER_FIREBASE_ID_KEY
} from "business-layer/utils/StripeProductMetadata"
import Stripe from "stripe"

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
   * Checks for processing payments from a user. Used to avoid
   * users from double paying after completing a checkout session for membership payments.
   *
   * @warning This assumes that users won't be paying for membership right after booking
   *
   * @param customerId `stripe_id` from the firebase document
   */
  public async hasProcessingPaymentIntent(customerId: string) {
    const { data } = await stripe.paymentIntents.list({
      customer: customerId
    })
    const hasProcessingPaymentIntent = !!data.find(
      (intent) => intent.status === "processing"
    )

    return hasProcessingPaymentIntent
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

  public async retrieveCheckoutSessionFromPaymentIntent(
    payment_intent?: string,
    customer?: string,
    status?: Stripe.Checkout.Session.Status
  ) {
    return await stripe.checkout.sessions.list({
      limit: 1,
      payment_intent,
      customer,
      status
    })
  }

  /**
   *
   * @param client_reference_id generally firebase id
   * @param email ideally extracted from user JWT
   * @param return_url
   * @param line_item format `{price: <price id of item>, quantity: X}`
   * @param metadata KVP of metadata
   * @param expires_after_mins Must be over 30 and under 24 hours (1140) we default to 31 minutes
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
    expires_after_mins: number = 31
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
      expires_at: dateNowSecs() + expires_after_mins * ONE_MINUTE_S
    })
    return session.client_secret
  }
}

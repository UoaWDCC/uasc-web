import {
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues
} from "business-layer/utils/StripeProductMetadata"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_API_KEY)

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
   * Used to return active payment sessions for user in the case of one session only payments (i.e memberships or bookings)
   * I.e to avoid creating excessive sessions
   * For events or payments that allow multiple sessions this method should NOT be used
   * @param email of the user (ideally extracted from their JWT token)
   * @param sessionType defined as the enum CheckoutTypeValues, only exists for `membership` and `booking` right now
   *
   * Will return undefined if no sessions found
   */
  public async getActiveSessionsForUser(
    email: string,
    sessionType: CheckoutTypeValues
  ): Promise<Stripe.Checkout.Session> {
    const { data } = await stripe.checkout.sessions.list({
      customer_details: { email }
    })
    const currentlyActiveSession = data.find(
      (session) =>
        session.metadata[CHECKOUT_TYPE_KEY] === sessionType &&
        session.status === "open"
    )
    // Might be undefined
    return currentlyActiveSession
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
   * @param return_url
   * @param line_item format `{price: <price id of item>, quantity: X}`
   * @param metadata KVP of metadata
   * @param expires_after_mins Must be over 30 and under 24 hours (1140)
   * @returns client secret
   */
  public async createCheckoutSession(
    client_reference_id: string,
    return_url: string,
    line_item: {
      price: string
      quantity: number
    },
    metadata: Record<string, string>,
    expires_after_mins?: number
  ) {
    const session = await stripe.checkout.sessions.create({
      // consumer changeable
      client_reference_id,
      return_url,
      line_items: [line_item],
      metadata,
      // configured internally and should not change
      ui_mode: "embedded",
      mode: "payment",
      currency: "NZD",
      expires_at: Date.now() + expires_after_mins * 60000 // 60000ms = 60secs
    })
    return session.client_secret
  }
}

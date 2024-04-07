import Stripe from "stripe"

const IS_JEST = process.env.JEST_WORKER_ID !== undefined

const stripe = new Stripe(
  IS_JEST ? process.env.STRIPE_API_SECRET : process.env.STRIPE_API_KEY
)

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

  public async retrieveCheckoutSessionFromPaymentIntent(
    paymentIntent: Stripe.PaymentIntent
  ) {
    return await stripe.checkout.sessions.retrieve(paymentIntent.id)
  }

  public async createCheckoutSession(
    client_reference_id: string,
    return_url: string,
    line_item: {
      price: string
      quantity: number
    },
    metadata: Record<string, string>
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
      currency: "NZD"
    })
    return session.client_secret
  }
}

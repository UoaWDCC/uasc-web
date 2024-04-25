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

  public async updateProduct(
    productId: string,
    updateFields: {
      active?: boolean
      description?: string
      metadata?: Record<string, string>
      price?: string
      name?: string
    }
  ) {
    const productUpdateParams: Stripe.ProductUpdateParams = {}
    if (updateFields.active !== undefined) {
      productUpdateParams.active = updateFields.active
    }
    if (updateFields.description !== undefined) {
      productUpdateParams.description = updateFields.description
    }
    if (updateFields.metadata !== undefined) {
      productUpdateParams.metadata = updateFields.metadata
    }
    if (updateFields.price !== undefined) {
      productUpdateParams.default_price = updateFields.price
    }
    if (updateFields.name !== undefined) {
      productUpdateParams.name = updateFields.name
    }
    const updatedProduct = await stripe.products.update(
      productId,
      productUpdateParams
    )
    return updatedProduct
  }
}

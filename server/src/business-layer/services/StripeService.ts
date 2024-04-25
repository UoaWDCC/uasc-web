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

    /** Return the updated product */
    return updatedProduct
  }
}

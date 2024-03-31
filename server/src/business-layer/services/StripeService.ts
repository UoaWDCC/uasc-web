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
}

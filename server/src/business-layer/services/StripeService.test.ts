import StripeService from "./StripeService"
import { productMock } from "test-config/mocks/Stripe.mock"
import Stripe from "stripe"

jest.mock("stripe", () => {
  const stripe = jest.requireActual("stripe")
  jest
    .spyOn(stripe.resources.Products.prototype, "search")
    .mockImplementation(() => Promise.resolve([productMock]))

  jest
    .spyOn(stripe.resources.Products.prototype, "list")
    .mockImplementation((props) => {
      const { limit = 10 } = props as {
        limit?: number
        starting_after?: string
      }
      const products = Array(limit).fill(productMock)
      return Promise.resolve({ data: products })
    })

  jest
    .spyOn(stripe.resources.Products.prototype, "retrieve")
    .mockImplementation((id) => Promise.resolve({ ...productMock, id }))

  jest
    .spyOn(stripe.resources.Products.prototype, "update")
    .mockImplementation((id, params: Stripe.ProductUpdateParams) =>
      Promise.resolve({ ...productMock, id, ...params })
    )

  return stripe
})

describe("Stripe service functionality", () => {
  it("should get all products with default length", async () => {
    const result = await new StripeService().getAllProducts()
    expect(result.length).toEqual(10)
  })

  it("should get all products with specified length", async () => {
    const result = await new StripeService().getAllProducts(4)
    expect(result.length).toEqual(4)
  })

  it("should get a product by id", async () => {
    const result = await new StripeService().getProductById("random_id")
    expect(result).toEqual({ ...productMock, id: "random_id" })
  })

  it("should update a product", async () => {
    const stripeService = new StripeService()
    const updatedProduct = await stripeService.updateProduct(
      "prod_NWjs8kKbJWmuuc",
      {
        active: false,
        description: "New description",
        metadata: { key: "value" },
        price: "786",
        name: "GOLD GOLD"
      }
    )

    // overriding specific properties that we expect to change
    expect(updatedProduct).toEqual({
      ...productMock,
      id: "prod_NWjs8kKbJWmuuc",
      active: false,
      description: "New description",
      metadata: { key: "value" },
      default_price: "786",
      name: "GOLD GOLD"
    })
  })
})

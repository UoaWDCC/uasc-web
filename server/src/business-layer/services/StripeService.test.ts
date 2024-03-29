import StripeService from "./StripeService"
import { productMock } from "test-config/mocks/Stripe.mock"

// 1. figure out how this stuff works
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
      const products = []
      for (let i = 0; i < limit; ++i) {
        products.push(productMock)
      }
    })

  jest
    .spyOn(stripe.resources.Products.prototype, "retrieve")
    .mockImplementation((id) => Promise.resolve({ ...productMock, id }))
  return stripe
})

// 2. finish writing tests for methods in StripeService
describe("Stripe service functionality", () => {
  it("should get a product with lookup key", async () => {
    const result = await new StripeService().getProductsWithLookupKey(
      "random_lookupKey"
    )
    expect(result).toEqual(productMock)
  })

  it("should get all products with default length", async () => {
    const result = await new StripeService().getAllProducts()
    expect(result.length).toBe(10)
  })

  it("should get a product by id", async () => {
    const result = await new StripeService().getProductById("random_id")
    expect(result).toEqual(productMock)
  })

  it("should get a product by metadata", async () => {
    const result = await new StripeService().getProductByMetadata(
      "random_key",
      "random_value"
    )
    expect(result).toEqual(productMock)
  })
})

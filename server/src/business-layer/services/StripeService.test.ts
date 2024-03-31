import StripeService from "./StripeService"
import { productMock } from "test-config/mocks/Stripe.mock"

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

  // should be using mock id? what's the point of testing again for the thing specified above
  it("should get a product by id", async () => {
    const result = await new StripeService().getProductById("random_id")
    expect(result).toEqual({ ...productMock, id: "random_id" })
  })

  // productMock doesn't have lookup key?
  // it("should get a product with lookup key", async () => {
  //   const result = await new StripeService().getProductsWithLookupKey(
  //     "prod_NWjs8kKbJWmuuc"
  //   )
  //   expect(result).toEqual(productMock)
  // })

  // productMock doesn't have metadata?
  // it("should get a product by metadata", async () => {
  //   const result = await new StripeService().getProductByMetadata("", "")
  //   expect(result).toEqual(productMock)
  // })
})

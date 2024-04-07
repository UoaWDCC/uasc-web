import StripeService from "./StripeService"
import { PaymentIntentMock, productMock } from "test-config/mocks/Stripe.mock"

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

  it("should get a product by id", async () => {
    const result = await new StripeService().getProductById("random_id")
    expect(result).toEqual({ ...productMock, id: "random_id" })
  })

  it("should retrieve a stripe session based on a mock", async () => {
    const result =
      await new StripeService().retrieveCheckoutSessionFromPaymentIntent(
        PaymentIntentMock
      )
    expect(result.id).toEqual(PaymentIntentMock.id)
  })
})

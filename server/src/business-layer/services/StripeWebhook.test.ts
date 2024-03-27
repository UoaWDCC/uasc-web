import StripeService from "./StripeService"

jest.mock("stripe", () => {
  const stripe = jest.requireActual("stripe")
  jest
    .spyOn(stripe.resources.Customers.prototype, "post")
    .mockImplementation(() => {
      Promise.resolve({ id: "stripe-test-id" })
    })
  return stripe
})

describe("Stripe Service", () => {
  it("should do this", async () => {
    const customer = new StripeService().getCustomer("eufhgeufh38g")
    expect(customer).toEqual(customerMock)
  })
})

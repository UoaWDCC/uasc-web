import { MembershipTypes } from "models/Payment"

const AppDataService = {
  getBankPaymentDetails: async function () {
    // TODO: Dynamically fetch and make sure there is appropriate fallback
    const data = { email: "uasc@gmail.com", bankAccount: "123121232" }
    return data
  },
  getMembershipPricingDetails: async function () {
    // TODO: Dynamically fetch and make sure there is appropriate fallback
    const prices: {
      title: string
      type: MembershipTypes
      priceString: string
      extraInfo?: string
    }[] = [
      {
        title: "UoA New",
        type: "uoa_new",
        priceString: "$45"
      },
      {
        title: "UoA Returning",
        type: "uoa_returning",
        priceString: "$45"
      },
      {
        title: "Other uni returning",
        type: "other_returning",
        priceString: "$45"
      },
      {
        title: "Other uni new",
        type: "other_new",
        priceString: "$45"
      }
    ]
    return prices
  }
} as const

export default AppDataService

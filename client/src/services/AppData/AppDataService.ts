import { MembershipTypes } from "models/Payment"

const AppDataService = {
  getBankPaymentDetails: async function () {
    // TODO: Dynamically fetch and make sure there is appropriate fallback
    const data = { email: "uasc@gmail.com", bankAccount: "unknown" }
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
        priceString: "$75"
      },
      {
        title: "UoA Returning",
        type: "uoa_returning",
        priceString: "$65"
      },
      {
        title: "Other returning",
        type: "other_returning",
        priceString: "$75"
      },
      {
        title: "New non-student",
        type: "other_new",
        priceString: "$95"
      }
    ]
    return prices
  }
} as const

export default AppDataService

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
        title: "UoA Student",
        type: "uoa_student",
        priceString: "$75"
      },
      {
        title: "Returning Member",
        type: "returning_member",
        priceString: "$65"
      },
      {
        title: "New Non Student",
        type: "new_non_student",
        priceString: "$75"
      },
      {
        title: "Non Uoa Student New",
        type: "non_uoa_student",
        priceString: "$95"
      }
    ]
    return prices
  }
} as const

export default AppDataService

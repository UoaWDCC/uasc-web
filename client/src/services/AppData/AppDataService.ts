import { MembershipTypes } from "models/Payment"

const AppDataService = {
  getBankPaymentDetails: async function () {
    const data = { email: "uasc@gmail.com", bankAccount: "123121232" }
    return data
  },
  getMembershipPricingDetails: async function () {
    // TODO: Dynamically fetch
    const prices: {
      title: string
      type: MembershipTypes
      priceString: string
      extraInfo: string
    }[] = [
      {
        title: "UoA New",
        type: "uoa_new",
        priceString: "$45",
        extraInfo: "Special offer ends 17th March"
      },
      {
        title: "UoA Returning",
        type: "uoa_returning",
        priceString: "$45",
        extraInfo: "Special offer ends 17th March"
      },
      {
        title: "Other uni returning",
        type: "other_returning",
        priceString: "$45",
        extraInfo: "Special offer ends 17th March"
      },
      {
        title: "Other uni new",
        type: "other_new",
        priceString: "$45",
        extraInfo: "Special offer ends 17th March"
      }
    ]
    return prices
  }
} as const

export default AppDataService

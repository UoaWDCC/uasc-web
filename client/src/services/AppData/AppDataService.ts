import { MembershipTypes } from "models/Payment" // may have to add PricingDetails here
import fetchClient from "services/OpenApiFetchClient"

export type Prices = {
  title: string
  name: MembershipTypes
  priceString: string
  originalPrice?: string
  extraInfo?: string
}

const AppDataService = {
  getBankPaymentDetails: async function () {
    // TODO: Dynamically fetch and make sure there is appropriate fallback
    const data = { email: "uasc@gmail.com", bankAccount: "unknown" }
    return data
  },
  getMembershipPricingDetails: async function (): Promise<Prices[]> {
    const { data } = await fetchClient.GET("/payment/membership_prices")

    const fallbackData: Prices[] = [
      {
        title: "UoA Student",
        name: "uoa_student",
        priceString: "$45",
        originalPrice: "$65",
        extraInfo: "Save $20"
      },
      {
        title: "Returning Member",
        name: "returning_member",
        priceString: "$65"
      },
      {
        title: "New Non Student",
        name: "new_non_student",
        priceString: "$75"
      },
      {
        title: "Non Uoa Student New",
        name: "non_uoa_student",
        priceString: "$95"
      }
    ]

    if (data && data.data) {
      const transformedData: Prices[] =
        data.data &&
        data.data.map((data) => {
          let displayName
          switch (data.name) {
            case "uoa_student":
              displayName = "UoA Student"
              break
            case "non_uoa_student":
              displayName = "Non-UoA Student"
              break
            case "returning_member":
              displayName = "Returning Member"
              break
            case "new_non_student":
              displayName = "New Non-UoA Student"
              break
          }
          if (data.originalPrice != null) {
            data.originalPrice = "$" + data.originalPrice
          }
          return {
            title: displayName,
            name: data.name,
            priceString: "$" + data.displayPrice,
            originalPrice: data.originalPrice,
            extraInfo: data.description
          }
        })
      return transformedData
    } else if (fallbackData) {
      return fallbackData
    } else {
      throw new Error(
        "Something went wrong when fetching the membership prices"
      )
    }
  }
} as const

export default AppDataService

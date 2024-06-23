import { MembershipTypes } from "models/Payment"
import fetchClient from "services/OpenApiFetchClient"

export type Prices = {
  title: string
  name: MembershipTypes
  priceString: string
  originalPrice?: string
  extraInfo?: string
}

const MembershipLongNames = {
  ALL_UOA_STUDENTS: "All UoA Students",
  NON_STUDENT_RETURNING: "Non-Student: Returning",
  NON_STUDENT_NEW: "Non-Student: New",
  ALL_OTHER_STUDENTS: "All Other Students"
} as const

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
        title: MembershipLongNames.ALL_UOA_STUDENTS,
        name: "uoa_student",
        priceString: "$45",
        originalPrice: "$65",
        extraInfo: "Save $20"
      },
      {
        title: MembershipLongNames.NON_STUDENT_RETURNING,
        name: "returning_member",
        priceString: "$65"
      },
      {
        title: MembershipLongNames.NON_STUDENT_NEW,
        name: "new_non_student",
        priceString: "$75"
      },
      {
        title: MembershipLongNames.ALL_OTHER_STUDENTS,
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
              displayName = MembershipLongNames.ALL_UOA_STUDENTS
              break
            case "non_uoa_student":
              displayName = MembershipLongNames.ALL_OTHER_STUDENTS
              break
            case "returning_member":
              displayName = MembershipLongNames.NON_STUDENT_RETURNING
              break
            case "new_non_student":
              displayName = MembershipLongNames.NON_STUDENT_NEW
              break
          }
          if (data.originalPrice != null) {
            data.originalPrice = `$${data.originalPrice}`
          }
          return {
            title: displayName,
            name: data.name,
            priceString: `$${data.displayPrice}`,
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

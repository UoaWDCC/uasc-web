import { Timestamp } from "firebase/firestore"
import { MembershipTypes } from "models/Payment"
import fetchClient from "services/OpenApiFetchClient"

const PaymentService = {
  getMembershipPaymentClientSecret: async function (
    membershipType?: MembershipTypes
  ) {
    const { data } = await fetchClient.POST("/payment/membership", {
      body: {
        membershipType
      }
    })
    if (!data) {
      throw new Error(
        "An error occured when trying to fetch the membership payment client secret"
      )
    }
    return data
  },
  getBookingPaymentClientSecret: async function (vars: {
    startDate?: Timestamp
    endDate?: Timestamp
  }) {
    const { data } = await fetchClient.POST("/payment/booking", {
      body: {
        startDate: vars.startDate,
        endDate: vars.endDate
      }
    })

    if (!data) {
      throw new Error(
        "An error occured when trying to fetch the membership payment client secret"
      )
    }

    return data
  }
} as const

export default PaymentService

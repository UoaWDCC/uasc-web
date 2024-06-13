import { Timestamp } from "firebase/firestore"
import { MembershipTypes } from "models/Payment"
import fetchClient from "services/OpenApiFetchClient"
import { UnavailableBookingError } from "services/Utils/Errors"

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
    const { data, response } = await fetchClient.POST("/payment/booking", {
      body: {
        startDate: vars.startDate,
        endDate: vars.endDate
      }
    })

    if (response.status === 409) {
      throw new UnavailableBookingError(
        "You may already have a booking associated with these dates. Please check the bookings under your profile, otherwise there may not be space left for one or more slots - try refreshing this page if you do not have any bookings for these dates."
      )
    }

    if (response.status === 423) {
      throw new UnavailableBookingError(
        "Someone may already be in a checkout session for these dates. Please try again later."
      )
    }

    if (!data?.stripeClientSecret) {
      throw new Error(
        "An error occured when trying to fetch the membership payment client secret"
      )
    }

    return data
  }
} as const

export default PaymentService

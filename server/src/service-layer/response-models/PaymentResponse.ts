import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import { CommonResponse } from "./CommonResponse"
import { Timestamp } from "firebase-admin/firestore"

type AvailableDates = {
  description: string
  date: Timestamp
  maxBookings: number
  availableSpaces: number
}

export interface MembershipPaymentResponse extends CommonResponse {
  stripeClientSecret?: string
  membershipType?: MembershipTypeValues
}

export interface BookingPaymentResponse extends CommonResponse {
  stripeClientSecret?: string
}

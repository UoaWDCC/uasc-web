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

// Make a data shape matching to the expected response from Stripe API
export interface MembershipStripeProductResponse extends CommonResponse {
  data?: {
    productId: string
    name: string
    description?: string
    discount: boolean
    displayPrice: string
    originalPrice?: string
  }[]
}

export interface AvailableDatesResponse extends CommonResponse {
  data?: AvailableDates[]
}

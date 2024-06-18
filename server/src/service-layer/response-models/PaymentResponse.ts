import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import { CommonResponse } from "./CommonResponse"
import { ReducedTimestamp } from "data-layer/adapters/DateUtils"

type AvailableDates = {
  id: string
  description?: string
  date: ReducedTimestamp
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

// Make a data shape matching to the expected response from Stripe API
export interface MembershipStripeProductResponse extends CommonResponse {
  data?: {
    productId: string
    name: MembershipTypeValues
    description?: string
    discount: boolean
    displayPrice: string
    originalPrice?: string
  }[]
}

export interface AvailableDatesResponse extends CommonResponse {
  data?: AvailableDates[]
}

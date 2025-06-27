import type {
  LodgePricingTypeValues,
  MembershipTypeValues
} from "business-layer/utils/StripeProductMetadata"
import type { CommonResponse } from "./CommonResponse"
import type { Timestamp } from "firebase-admin/firestore"

type AvailableDates = {
  id: string
  description?: string
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

// Make a data shape matching to the expected response from Stripe API
export interface LodgeStripeProductResponse extends CommonResponse {
  data?: {
    productId: string
    name: LodgePricingTypeValues
    description?: string
    discount: boolean
    displayPrice: string
    originalPrice?: string
  }[]
}

export interface AvailableDatesResponse extends CommonResponse {
  data?: AvailableDates[]
}

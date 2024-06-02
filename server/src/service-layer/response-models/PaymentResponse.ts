import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import { CommonResponse } from "./CommonResponse"

export interface MembershipPaymentResponse extends CommonResponse {
  stripeClientSecret?: string
  membershipType?: MembershipTypeValues
}

// Make a data shape matching to the expected response from Stripe API
export interface MembershipStripeProductResponse {
  productId: string
  name: MembershipTypeValues
  description?: string
  discount: boolean
  displayPrice: string
  originalPrice?: string
}

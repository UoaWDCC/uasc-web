import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import { CommonResponse } from "./CommonResponse"

export interface MembershipPaymentResponse extends CommonResponse {
  stripeClientSecret?: string
  membershipType?: MembershipTypeValues
}

// Make a data shape matching to the ticket
export interface MembershipPricesResponse {
  productId: string
  name: MembershipTypeValues 
  description?: string
  discount: boolean
  displayPrice: string
  originalPrice?: string
}

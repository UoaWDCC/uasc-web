import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import { CommonResponse } from "./CommonResponse"

export interface MembershipPaymentResponse extends CommonResponse {
  stripeClientSecret?: string
  membershipType?: MembershipTypeValues
}

export interface BookingPaymentResponse extends CommonResponse {
  stripeClientSecret?: string
}

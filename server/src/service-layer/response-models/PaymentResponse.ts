import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import { CommonResponse } from "./CommonResponse"

export interface MembershipPaymentResponse extends CommonResponse {
  clientSecret?: string
  membershipType?: MembershipTypeValues
}

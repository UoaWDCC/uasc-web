import { MembershipType } from "business-layer/utils/MembershipType"
import { CommonResponse } from "./CommonResponse"

export interface MembershipPaymentResponse extends CommonResponse {
  clientSecret?: string
  membershipType?: MembershipType
}

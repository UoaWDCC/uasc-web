import { UserAdditionalInfo } from "data-layer/models/firebase"
import { CommonResponse } from "service-layer/response-models/CommonResponse"

export interface UserSignupBody extends CommonResponse {
  email: string
  user: UserAdditionalInfo
}

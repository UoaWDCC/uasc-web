import { UserAdditionalInfo } from "data-layer/models/firebase"
import { CommonResponse } from "./CommonResponse"
import { UserAccountTypes } from "business-layer/utils/AuthServiceClaims"

export interface AllUsersResponse extends CommonResponse {
  data: UserAdditionalInfo[] &
    {
      uid: string
      dateJoined: string
      email: string
      membership: UserAccountTypes
    }[]
}

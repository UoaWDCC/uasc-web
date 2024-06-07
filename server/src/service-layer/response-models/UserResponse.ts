import { UserAdditionalInfo } from "data-layer/models/firebase"
import { CommonResponse } from "./CommonResponse"
import { UserAccountTypes } from "business-layer/utils/AuthServiceClaims"

export interface AllUsersResponse extends CommonResponse {
  data: UserAdditionalInfo[] &
    {
      /**
       * Firebase identifier of the user *data* based on the firestore document
       */
      uid: string
      /**
       * Formatted UTC date string of when the account was created
       */
      dateJoined: string
      /**
       * The email the user uses to log in
       */
      email: string
      /**
       * What type of account the user has
       */
      membership: UserAccountTypes
    }[]
}

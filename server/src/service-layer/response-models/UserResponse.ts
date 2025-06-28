import type { UserAdditionalInfo } from "data-layer/models/firebase"
import type { CommonResponse, CursorPaginatedResponse } from "./CommonResponse"
import type { UserAccountTypes } from "business-layer/utils/AuthServiceClaims"

export interface CombinedUserData extends UserAdditionalInfo {
  /**
   * Firebase identifier of the user *data* based on the firestore document
   */
  uid: string
  /**
   * Formatted UTC date string of when the account was created
   */
  dateJoined?: string
  /**
   * The email the user uses to log in
   */
  email: string
  /**
   * What type of account the user has
   */
  membership: UserAccountTypes
}

export interface AllUsersResponse
  extends CommonResponse,
    CursorPaginatedResponse {
  data?: CombinedUserData[]
}

export interface BookingIdandUserData extends CombinedUserData {
  bookingId: string
}

export interface GetUserResponse extends CommonResponse {
  data?: CombinedUserData
}

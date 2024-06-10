import { UserResponse } from "./UserResponse"
import { Timestamp } from "firebase-admin/firestore"

export interface CommonResponse {
  error?: string
  message?: string
}

/**
 * Represents the response structure for fetching users by date range.
 */
export interface UsersByDateRangeResponse {
  data?: Array<{ date: Timestamp; users: UserResponse[] }>
  error?: string
}

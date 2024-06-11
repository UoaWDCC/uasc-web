import { UserResponse } from "./UserResponse"
import { Timestamp } from "firebase-admin/firestore"

export interface CommonResponse {
  error?: string
  message?: string
}

export interface OffsetPaginatedResponse {
  /**
   * Indicates the offset that would give the next page of data
   *
   * **Will be undefined in case of last page**
   */
  nextOffset?: number
}

export interface CursorPaginatedResponse {
  /**
   * Needed for firestore operations which do not support offset
   * based pagination
   *
   * **Will be undefined in case of last page**
   */
  nextCursor?: string
}

/**
 * Represents the response structure for fetching users by date range.
 */
export interface UsersByDateRangeResponse {
  data?: Array<{ date: Timestamp; users: UserResponse[] }>
  error?: string
}

import { Timestamp } from "firebase-admin/firestore"
import { CommonResponse } from "./CommonResponse"
import { CombinedUserData } from "./UserResponse"

export interface BookingSlotUpdateResponse extends CommonResponse {
  updatedBookingSlots?: { date: Timestamp; bookingSlotId: string }[]
}

export interface AllUserBookingSlotsResponse extends CommonResponse {
  dates?: string[]
}

/**
 * Represents the response structure for fetching users by date range.
 */
export interface UsersByDateRangeResponse {
  data?: Array<{ date: Timestamp; users: CombinedUserData[] }>
  error?: string
}

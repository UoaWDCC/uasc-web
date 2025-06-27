import type { Timestamp } from "firebase-admin/firestore"
import type { CommonResponse } from "./CommonResponse"
import type { BookingIdandUserData } from "./UserResponse"

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
  data?: Array<{ date: Timestamp; users: BookingIdandUserData[] }>
  error?: string
}

/**
 * Represents the response structure for fetching user ids by date range.
 */
export interface UIdssByDateRangeResponse {
  data?: Array<{ date: Timestamp; users: string[] }>
  error?: string
}

export interface BookingDeleteResponse extends CommonResponse {
  user_id?: string
}

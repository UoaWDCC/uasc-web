import { Timestamp } from "firebase-admin/firestore"
import { CommonResponse } from "./CommonResponse"
import { BookingIdandUserData } from "./UserResponse"

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
export interface BookingCreateResponse {
  data?: {
    bookedDates: Timestamp[]
    user: string
  }
  error?: string
}

export interface BookingDeleteResponse extends CommonResponse {
  user_id?: string
}

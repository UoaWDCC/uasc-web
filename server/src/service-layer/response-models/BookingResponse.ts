import { CommonResponse } from "./CommonResponse"
import { CombinedUserData } from "./UserResponse"
import { ReducedTimestamp } from "data-layer/adapters/DateUtils"

export interface BookingSlotUpdateResponse extends CommonResponse {
  updatedBookingSlots?: { date: ReducedTimestamp; bookingSlotId: string }[]
}

export interface AllUserBookingSlotsResponse extends CommonResponse {
  dates?: string[]
}

/**
 * Represents the response structure for fetching users by date range.
 */
export interface UsersByDateRangeResponse {
  data?: Array<{ date: ReducedTimestamp; users: CombinedUserData[] }>
  error?: string
}

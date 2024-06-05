import { Timestamp } from "firebase-admin/firestore"
import { CommonResponse } from "./CommonResponse"

export interface BookingSlotUpdateResponse extends CommonResponse {
  updatedBookingSlots?: { date: Timestamp; bookingSlotId: string }[]
}

export interface AllUserBookingSlotsResponse extends CommonResponse {
  dates?: Timestamp[]
}

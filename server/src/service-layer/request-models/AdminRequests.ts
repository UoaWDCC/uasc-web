import { Timestamp } from "firebase-admin/firestore"

export interface MakeDatesAvailableRequestBody {
  bookingSlotId: string
  startDate: Timestamp
  endDate: Timestamp
}

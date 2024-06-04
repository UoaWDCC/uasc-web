import { Timestamp } from "firebase-admin/firestore"

export interface MakeDatesAvailableRequestBody {
  startDate: Timestamp
  endDate: Timestamp
}

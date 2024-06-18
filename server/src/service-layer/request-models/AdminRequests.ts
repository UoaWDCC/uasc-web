import { Timestamp } from "firebase-admin/firestore"

export interface MakeDatesAvailableRequestBody {
  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  startDate: Timestamp

  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  endDate: Timestamp

  /**
   * @isNumber Please enter a number
   * @maximum 32 You have exceeded the maximum slots for bookings
   * @minimum 0 must be positive
   */
  slots?: number
}

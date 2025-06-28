import type { Timestamp } from "firebase-admin/firestore"

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

export interface AddCouponRequestBody {
  /**
   * The UID of the user to whom the coupon will be added.
   */
  uid: string

  /**
   * The number of the coupon to be added.
   */
  quantity: number
}

export interface DeleteBookingRequest {
  /**
   * @bookingId The id of the booking(not booking slot id) that was created
   */
  bookingID: string
}

export interface FetchLatestBookingEventRequest {
  /**
   * @isNumber Please enter a number
   * @maximum 500 please select a smaller limit (max 500)
   * @minimum 1 please choose a positive, non-zero limit
   */
  limit: number

  /**
   * The id of the cursor to continue paginating from
   */
  cursor?: string
}

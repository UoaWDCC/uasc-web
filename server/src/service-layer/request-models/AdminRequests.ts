import { Timestamp } from "firebase-admin/firestore"

export interface MakeDatesAvailableRequestBody {
  /**
   * Firestore timestamp, ideally with the time information removed (set to midnight)
   */
  startDate: Timestamp

  /**
   * Firestore timestamp, ideally with the time information removed (set to midnight)
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

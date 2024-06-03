/**
 * To be used when creating checkout sessions
 */
export const CHECKOUT_TYPE_KEY = "checkout_type"
export enum CheckoutTypeValues {
  MEMBERSHIP = "membership",
  BOOKING = "booking"
}

/**
 * For membership products
 */
export const MEMBERSHIP_TYPE_KEY = "membership_type"
export enum MembershipTypeValues {
  UoaReturning = "uoa_returning",
  UoaNew = "uoa_new",
  OtherReturning = "other_returning",
  OtherNew = "other_new"
}

/**
 * For lodge bookings
 */
export const BOOKING_SLOTS_KEY = "booking_slots"
export const LODGE_BOOKING_TYPE_KEY = "lodge_booking_type"
export enum LodgeBookingTypeValues {
  Weekend = "weekend",
  Weekday = "weekday"
}

/**
 * For customer objects
 */
export const USER_FIREBASE_ID_KEY = "firebase_user_id"
export const USER_FIREBASE_EMAIL_KEY = "firebase_user_email"

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
  UoaStudent = "uoa_student",
  NonUoaStudent = "non_uoa_student",
  ReturningMember = "returning_member",
  NewNonStudent = "new_non_student"
}

/**
 * For customer objects
 */
export const USER_FIREBASE_ID_KEY = "firebase_user_id"
export const USER_FIREBASE_EMAIL_KEY = "firebase_user_email"

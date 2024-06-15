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
 * Used to query stripe for the pricing model to be used for a booking
 *
 * Should have a value of `LodgePricingTypeValues`
 *
 * @example [LODGE_PRICING_TYPE_KEY]: LodgePricingTypeValues.Normal
 */
export const LODGE_PRICING_TYPE_KEY = "lodge_pricing_type"
export enum LodgePricingTypeValues {
  SingleFridayOrSaturday = "single_friday_or_saturday",
  Normal = "normal"
}

/*
 * For stripe product
 */
export const MEMBERSHIP_PRODUCT_TYPE_KEY = "product_type"
export enum ProductTypeValues {
  MEMBERSHIP = "membership",
  BOOKING = "booking"
}

/**
 * For customer objects
 */
export const USER_FIREBASE_ID_KEY = "firebase_user_id"
export const USER_FIREBASE_EMAIL_KEY = "firebase_user_email"

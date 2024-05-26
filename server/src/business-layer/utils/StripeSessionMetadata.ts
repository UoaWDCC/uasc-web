/**
 * To be used when creating checkout sessions
 */
export const CHECKOUT_TYPE_KEY = "checkout_type"
export enum CheckoutTypeValues {
  MEMBERSHIP = "membership",
  BOOKING = "booking"
}

/**
 * For booking checkouts, stored in a Stripe session.
 *
 * The value at this metadata key will be a JSON serialized array, storing date strings.
 *
 * @example '["2024-04-23","2024-04-24","2024-04-26"]'
 */
export const BOOKING_SLOTS_KEY = "booking_slot"

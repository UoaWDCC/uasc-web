/**
 * To be used when creating checkout sessions. The value will be the enum
 * `CheckoutTypeValues`
 *
 * @example [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.BOOKING
 */
export const CHECKOUT_TYPE_KEY = "checkout_type"
export enum CheckoutTypeValues {
  MEMBERSHIP = "membership",
  BOOKING = "booking"
}

/**
 * For booking checkouts, stored in a Stripe session.
 *
 * The value at this metadata key will be a JSON serialized array, storing booking slot document IDs.
 *
 * @example '["ef40TsK5emACG5K08j2n", "Zx0hVyCax6YhTl9PRcTq"]'
 */
export const BOOKING_SLOTS_KEY = "booking_slot"

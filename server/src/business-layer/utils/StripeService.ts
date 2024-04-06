export const CHECKOUT_TYPE_VALUES = {
  MEMBERSHIP: "membership",
  BOOKING: "booking"
} as const

export interface StripeMetadata {
  /**
   * @isString Please enter either Admin or Member or Guest
   */
  type: "membership" | "booking"
}

export const CHECKOUT_TYPE_KEY = "type"

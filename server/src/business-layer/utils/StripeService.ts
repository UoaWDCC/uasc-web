export const CheckoutSubscriptions = {
  MEMBERSHIP: "membership",
  BOOKING: "booking"
} as const

export interface StripeMetadata {
  /**
   * @isString Please enter either Admin or Member or Guest
   */
  type: "membership" | "booking"
}

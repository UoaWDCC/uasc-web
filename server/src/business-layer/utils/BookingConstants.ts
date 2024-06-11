/**
 * The default max amount of spots a booking should have. Used when making booking available
 */
export const DEFAULT_BOOKING_MAX_SLOTS = 32 as const

/**
 * A constant that the `max_bookings` field should be set to for a `booking_slot` to indicate its unavailable
 */
export const EMPTY_BOOKING_SLOTS = 0 as const

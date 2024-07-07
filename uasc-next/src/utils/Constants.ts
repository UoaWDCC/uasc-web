export const MS_IN_SECOND = 1000 as const
export const DEFAULT_BOOKING_AVAILABILITY = 32 as const
export const MEMBER_TABLE_MAX_DATA = 100

/**
 * Need to remove time data from this
 */
let TODAY = new Date()
TODAY = new Date(TODAY.toDateString())

/**
 * Need to remove time data from this
 */
let NEXT_YEAR_FROM_TODAY = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
)
NEXT_YEAR_FROM_TODAY = new Date(NEXT_YEAR_FROM_TODAY.toDateString())

const CHECK_OUT_TIME = "10:00am" as const
const CHECK_IN_TIME = "3:00pm" as const

export { TODAY, NEXT_YEAR_FROM_TODAY, CHECK_IN_TIME, CHECK_OUT_TIME }

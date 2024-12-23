export const MS_IN_SECOND = 1000 as const
export const DEFAULT_BOOKING_AVAILABILITY = 32 as const
export const MEMBER_TABLE_MAX_DATA = 100

export const DEFAULT_NORMAL_PRICE = 40 as const
export const DEFAULT_SPECIAL_PRICE = 60 as const

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
const CHECK_IN_TIME = "11:00am" as const

export { TODAY, NEXT_YEAR_FROM_TODAY, CHECK_IN_TIME, CHECK_OUT_TIME }

import { Timestamp } from "firebase-admin/firestore"
import { LodgePricingTypeValues } from "./StripeProductMetadata"
import { firestoreTimestampToDate } from "data-layer/adapters/DateUtils"

// Need to validate the booking date through a startDate and endDate range.
/**
 * @deprecated do not use, exported for testing purposes
 */
export const _earliestDate = new Date(Date.now())
_earliestDate.setUTCHours(0, 0, 0, 0)

/**
 * @deprecated do not use, exported for testing purposes
 */
export const _latestDate = new Date(_earliestDate)
_latestDate.setFullYear(_earliestDate.getFullYear() + 1)

const BookingUtils = {
  /**
   * Used to check if the dates are within the acceptable range
   *
   * This *acceptable* range is today to one year later max
   *
   * @param startDate firestore `Timestamp`
   * @param endDate firestore `Timestamp`
   * @returns true if the date range is invalid, false otherwise
   */
  hasInvalidStartAndEndDates: function (
    startDate: Timestamp,
    endDate: Timestamp,
    earliestDate?: Date,
    latestDate?: Date
  ) {
    if (!earliestDate) {
      earliestDate = _earliestDate
    }
    if (!latestDate) {
      latestDate = _latestDate
    }

    earliestDate.setUTCHours(0, 0, 0, 0)
    latestDate.setFullYear(earliestDate.getFullYear() + 1)

    return (
      endDate.seconds < startDate.seconds ||
      firestoreTimestampToDate(startDate) < earliestDate ||
      firestoreTimestampToDate(endDate) > latestDate
    )
  },
  /**
   * Used to find how many times a slot id occurs out of the active checkout sessions
   *
   * @param busySlotIds any 1d array of strings
   * @returns a map keyed by the slot id with the amount of occurences
   */
  getSlotOccurences: function (busySlotIds: Array<string>) {
    const slotOccurences = new Map<string, number>()
    busySlotIds.forEach((slotId) => {
      const currentSlots = slotOccurences.get(slotId)
      if (!currentSlots) {
        slotOccurences.set(slotId, 1)
      } else {
        slotOccurences.set(slotId, currentSlots + 1)
      }
    })
    return slotOccurences
  },
  /**
   * Checks if the dates should be priced differently
   * (the current condition is if a single Friday or Saturday is requested)
   *
   * @param datesInBooking an array of dates for checking
   * @returns a `LodgePricingTypeValue` based on if the date meets any special conditions
   */
  getRequiredPricing: function (
    datesInBooking: Timestamp[]
  ): LodgePricingTypeValues {
    const totalDays = datesInBooking.length
    const FRIDAY = 5
    const SATURDAY = 6
    // get requiredBookingType
    if (
      // Single day requested
      totalDays === 1 &&
      [FRIDAY, SATURDAY].includes(
        new Date(firestoreTimestampToDate(datesInBooking[0])).getUTCDay()
      )
    ) {
      return LodgePricingTypeValues.SingleFridayOrSaturday
    } else {
      return LodgePricingTypeValues.Normal
    }
  }
} as const

export default BookingUtils

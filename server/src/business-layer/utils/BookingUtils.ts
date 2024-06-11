import { Timestamp } from "firebase-admin/firestore"

// Need to validate the booking date through a startDate and endDate range.
/**
 * @deprecated do not use, exported for testing purposes
 */
export const _earliestDate = new Date()
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
    earliestDate: Date = _earliestDate,
    latestDate: Date = _latestDate
  ) {
    return (
      endDate.seconds < startDate.seconds ||
      startDate.seconds * 1000 < earliestDate.getTime() ||
      endDate.seconds * 1000 > latestDate.getTime()
    )
  },
  /**
   * Used to find how many times a slot id occurs out of the active checkout sessions
   *
   * @param busySlotIds any 1d array of strings
   * @returns a map keyed by the slot id with the amount of occurences
   */
  getSlotOccurences: function (busySlotIds: Array<string>) {
    const slotOccurences: Record<string, number> = {}
    busySlotIds.map((slotId) => {
      if (!slotOccurences[slotId]) {
        slotOccurences[slotId] = 1
      } else {
        ++slotOccurences[slotId]
      }
      return undefined
    })
    return slotOccurences
  }
} as const

export default BookingUtils

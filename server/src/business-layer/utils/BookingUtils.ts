import { Timestamp } from "firebase-admin/firestore"
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
  fridayXorSaturday: function (datesInBooking: Timestamp[]): boolean {
    const FRIDAY = 5
    const SATURDAY = 6
    const containsFriday = datesInBooking.some(
      (timestamp) =>
        new Date(firestoreTimestampToDate(timestamp)).getUTCDay() === FRIDAY
    )
    const containsSaturday = datesInBooking.some(
      (timestamp) =>
        new Date(firestoreTimestampToDate(timestamp)).getUTCDay() === SATURDAY
    )
    // get requiredBookingType
    if (
      // Friday XOR Saturday
      (containsFriday && !containsSaturday) ||
      (!containsFriday && containsSaturday)
    ) {
      return true
    } else {
      return false
    }
  },
  /**
   * Creates the required line items for a booking checkout
   *
   * @param containsSpecialPrice if we need to add a special price for a more expensive date
   * @param totalDays amount of dates TOTAL in the bookng
   * @param specialDefaultPrice the stripe price id of the special price
   * @param normalDefaultPrice the stripe price if of the normal price
   * @returns line items that can be passed into a checkout session
   */
  createBookingLineItems: function (
    containsSpecialPrice: boolean,
    totalDays: number,
    specialDefaultPrice: string,
    normalDefaultPrice: string
  ): {
    price: string
    quantity: number
  }[] {
    const lineItems: {
      price: string
      quantity: number
    }[] = []

    if (totalDays === 0) {
      return lineItems
    }

    if (containsSpecialPrice) {
      lineItems.push({
        price: specialDefaultPrice,
        quantity: 1
      })
    }

    if (containsSpecialPrice && totalDays > 1) {
      lineItems.push({
        price: normalDefaultPrice,
        quantity: totalDays - 1
      })
    }

    if (!containsSpecialPrice) {
      lineItems.push({
        price: normalDefaultPrice,
        quantity: totalDays
      })
    }
    return lineItems
  }
} as const

export default BookingUtils

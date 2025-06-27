import { firestoreTimestampToDate } from "data-layer/adapters/DateUtils"
import type { Timestamp } from "firebase-admin/firestore"
import BookingDataService from "../../data-layer/services/BookingDataService"
import BookingSlotService from "../../data-layer/services/BookingSlotsService"
import { LodgePricingTypeValues } from "./StripeProductMetadata"

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

export const CHECK_IN_TIME = "11:00 am" as const
export const CHECK_OUT_TIME = "10:00 am" as const

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
  hasInvalidStartAndEndDates: (
    startDate: Timestamp,
    endDate: Timestamp,
    earliestDate?: Date,
    latestDate?: Date
  ) => {
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
  getSlotOccurences: (busySlotIds: Array<string>) => {
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
  getRequiredPricing: (datesInBooking: Timestamp[]): LodgePricingTypeValues => {
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
  },

  /**
   * Checks if the last spot is taken for a specific booking slot
   * @param bookingSlotId The ID of the booking slot
   * @returns true if the last spot is taken, false otherwise
   */
  isLastSpotTaken: async (bookingSlotId: string): Promise<boolean> => {
    const bookingDataService = new BookingDataService()
    const bookingSlotService = new BookingSlotService()

    const bookingSlot =
      await bookingSlotService.getBookingSlotById(bookingSlotId)

    const bookings = await bookingDataService.getBookingsBySlotId(bookingSlotId)
    const bookingCount = bookings.length

    const availableSlots = bookingSlot.max_bookings - bookingCount
    return availableSlots <= 0
  },
  /**
   * Adds one day to the given date string in the format dd/mm/yyyy.
   *
   * This function parses the input date string, adds one day to it, and then
   * formats it back to the dd/mm/yyyy string format. It correctly handles edge
   * cases such as the end of a month, end of a year, and leap years.
   *
   * @param {string} dateString - The date string in the format dd/mm/yyyy.
   * @returns {string} - The new date string, one day later, in the format dd/mm/yyyy.
   *
   * @throws {Error} - Throws an error if the input date string is not in the format dd/mm/yyyy.
   *
   * @example
   * ```typescript
   * addOneDay('31/07/2024'); // Returns '01/08/2024'
   * addOneDay('28/02/2024'); // Returns '29/02/2024'
   * addOneDay('31/12/2024'); // Returns '01/01/2025'
   * ```
   *
   * @remarks
   * This function uses the JavaScript `Date` object to handle date manipulation.
   * The `Date` object automatically adjusts for month and year boundaries, including
   * leap years. The function assumes the input date string is valid and in the correct
   * format. If the input date string is invalid or not in the format dd/mm/yyyy, the
   * function will throw an error.
   */
  addOneDay: (dateString: string): string => {
    // Parse the input date string
    const [day, month, year] = dateString.split("/").map(Number)
    const date = new Date(year, month - 1, day)

    // Add one day
    date.setDate(date.getDate() + 1)

    if (isNaN(date.getTime()) || year < 2000) {
      throw new Error("Invalid date")
    }

    // Format the new date back to dd/mm/yyyy
    const newDay = String(date.getDate()).padStart(2, "0")
    const newMonth = String(date.getMonth() + 1).padStart(2, "0")
    const newYear = date.getFullYear()

    return `${newDay}/${newMonth}/${newYear}`
  }
} as const

export default BookingUtils

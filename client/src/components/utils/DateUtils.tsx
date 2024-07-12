import { BookingAvailability } from "@/models/Booking"
import { MS_IN_SECOND } from "@/utils/Constants"

export type DateRange = {
  /**
   * Javascript date object representing the date of the first night for the booking
   */
  startDate: Date

  /**
   * Javascript date object representing the date of the last night for the booking
   */
  endDate: Date
}
/**
 * Utility type to allow us to handle cases where the timestamp may actually have
 * `_seconds` or `_nanoseconds`
 */
export interface UnknownTimestamp extends Record<string, number> {}

export const DateUtils = {
  /**
   * gets a list of dates that are unavailable from availability objects
   *
   * @param bookingSlots the list of booking slots for which to search for unavailbale dates
   * @returns the fully unavailable dates
   */
  unavailableDates: (bookingSlots: BookingAvailability[]) =>
    bookingSlots.filter((slot) => slot.availableSpaces <= 0),

  UTCDatesEqual: (slot: UnknownTimestamp, date: Date) => {
    return DateUtils.dateEqualToTimestamp(
      DateUtils.convertLocalDateToUTCDate(date),
      slot
    )
  },
  datesToDateRange: (startDate: Date, endDate: Date) => {
    const dateArray = []
    const currentDate = new Date(startDate)

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate))
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + 1)
    }
    return dateArray
  },

  /**
   *
   * Checks if date range is a single friday or saturday, to be used for
   * price estimation on the front end
   *
   * @param startDate the first date in the selected range
   * @param endDate the last date in the selected range
   * @returns `true` if it is a single friday or saturday, `false` otherwise
   */
  isSingleFridayOrSaturday: (startDate: Date, endDate: Date): boolean => {
    const FRIDAY = 5
    const SATURDAY = 6
    const dateArray = DateUtils.datesToDateRange(startDate, endDate)
    return (
      dateArray.length === 1 &&
      [FRIDAY, SATURDAY].includes(dateArray[0].getDay())
    )
  },

  /**
   * @param date to compare
   * @param timestamp to compare
   * @returns `true` if the two are equal
   */
  dateEqualToTimestamp: (date: Date, timestamp: UnknownTimestamp): boolean => {
    return date.getTime() === DateUtils.timestampMilliseconds(timestamp)
  },

  /**
   * @param timestamp any object that contains the `seconds` and `nanosecond` properties,
   * like the timestamp from `firebase`
   * @returns a date object representative of the timestamp
   */
  timestampToDate: (timestamp: {
    seconds: number
    nanoseconds: number
  }): Date => {
    return new Date(timestamp.seconds * MS_IN_SECOND)
  },

  /**
   * Used to deal with readonly props being serialised with an underscore
   *
   * This is preferred over the `toMillis` method due to it possibly being `undefined`
   * on timestamp objects received from the backend
   *
   * @param timestamp timestamp which may have underscores
   * @returns the milliseconds values
   */
  timestampMilliseconds: (timestamp: UnknownTimestamp): number => {
    const seconds = timestamp.seconds || timestamp._seconds || 0
    const nanoseconds = timestamp.nanoseconds || timestamp._nanoseconds || 0
    return seconds * MS_IN_SECOND + nanoseconds / 1000000
  },

  /**
   * Converts date to the corresponding UTC date by removing the offset
   * introduced by the timezone while also making sure that it is the
   * midnight time (Essentially removes the time component)
   *
   * [React calendar reference](https://github.com/wojtekmaj/react-calendar/issues/511#issuecomment-835333976)
   *
   * [UASC Wiki reference](https://github.com/UoaWDCC/uasc-web/wiki/Backend-Architecture#note-on-dates)
   *
   * This should be used on **ALL** requests that send dates to the backend
   *
   * **Note**: the original date is not mutated
   *
   * @param d the date to convert to UTC
   * @returns a Date object that was converted
   */
  convertLocalDateToUTCDate: (d: Date): Date => {
    const utcDate = new Date(
      d.getTime() - d.getTimezoneOffset() * 60 * MS_IN_SECOND
    )
    utcDate.setUTCHours(0, 0, 0, 0)
    return utcDate
  },

  /**
   * @param date a date object
   * @returns a date string in the nz format `dd-mm-yyyy`
   */
  formattedNzDate: (date: Date): string => date.toLocaleDateString("en-NZ"),

  /**
   * Gets the ms since unix epoch from a nz date
   *
   * @param nzDate a string formatted with the format `DD/MM/YYYY`
   * @returns the amount of milliseconds for that date
   */
  nzDateStringToMillis: (nzDate: string): number => {
    const parts = nzDate.split("/")

    if (parts.length !== 3) {
      console.error("Invalid date given. Must be in format DD/MM/YYYY")
      return 0
    }
    // Format
    return new Date(
      Number.parseInt(parts[2]),
      Number.parseInt(parts[1]) - 1, // Months are 0 indexed
      Number.parseInt(parts[0])
    ).getTime()
  },
  /**
   * @param date the date to put into format for input
   * @returns the date string for date input to parse
   */
  formatDateForInput: (date?: Date) => {
    return date?.toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" })
  }
} as const

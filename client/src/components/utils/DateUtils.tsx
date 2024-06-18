import { MS_IN_SECOND } from "utils/Constants"

export const DateUtils = {
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

  isSingleFridayOrSaturday: (startDate: Date, endDate: Date) => {
    const FRIDAY = 5
    const SATURDAY = 6
    const dateArray = DateUtils.datesToDateRange(startDate, endDate)
    return (
      dateArray.length === 1 &&
      [FRIDAY, SATURDAY].includes(dateArray[0].getDay())
    )
  },
  /**
   * @param timestamp any object that contains the `seconds` and `nanosecond` properties,
   * like the timestamp from `firebase`
   * @returns a date object representative of the timestamp
   */
  timestampToDate: (timestamp: { seconds: number; nanoseconds: number }) => {
    return new Date(timestamp.seconds * MS_IN_SECOND)
  },

  timestampSeconds: <T extends Record<string, number>>(timestamp: T) => {
    if (timestamp.seconds) return timestamp.seconds
    if (timestamp._seconds) return timestamp._seconds
    throw new Error("Object does not have any fields for timestamp seconds")
  },

  /**
   * Converts date to the corresponding UTC date by removing the offset
   * introduced by the timezone while also making sure that it is the
   * midnight time (Essentially removes the time component)
   *
   * This should be used on **ALL** requests that send dates to the backend
   *
   * **Note**: the original date is not mutated
   *
   * @param d the date to convert to UTC
   * @returns a Date object that was converted
   */
  convertLocalDateToUTCDate: (d: Date) => {
    const utcDate = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
    utcDate.setUTCHours(0, 0, 0, 0)
    return utcDate
  },

  /**
   * @param date a date object
   * @returns a date string in the nz format `dd-mm-yyyy`
   */
  formattedNzDate: (date: Date) => date.toLocaleDateString("en-NZ")
} as const

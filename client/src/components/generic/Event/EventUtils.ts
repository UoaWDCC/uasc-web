import { MS_IN_SECOND } from "@/utils/Constants"

/**
 * Static methods to format strings related to events
 */
export const EventMessages = {
  /**
   * Message to be displayed if sign ups have opened in relation to the sign up date
   *
   * @param signUpOpenDate the date object corresponding to the timestamp when the sign ups open
   * @returns a formatted, user-readable string notifying the user of an event's sign up status
   */
  signUpOpen: (signUpOpenDate: Date) => {
    const currentDate = new Date()
    // Sign Ups have opened
    if (signUpOpenDate <= currentDate) {
      return `Sign ups have opened! (Since ${EventDateFormatting.shortDate(signUpOpenDate)})` as const
    } else {
      return `Sign up opens at ${EventDateFormatting.shortDate(signUpOpenDate)}` as const
    }
  },
  /**
   * Creates a formatted string showing the user the relevant dates for which the date is ongoing.
   *
   * @param eventStartDate date object corresponding to the start timestamp of the event
   * @param eventEndDate _optional_ date object if the event spans multiple days and has an end date timestamp
   * @returns a readable string which informs of the date(s) associated with the event
   */
  eventDateRange: (eventStartDate: Date, eventEndDate?: Date) => {
    const startDateMessage =
      `${EventDateFormatting.shortDayName(eventStartDate)} ${eventStartDate.toLocaleDateString()} • ${EventDateFormatting.shortTime(eventStartDate)}` as const

    if (!eventEndDate) {
      return startDateMessage
    }

    const endDateMessage =
      `${EventDateFormatting.shortDayName(eventEndDate)} ${eventStartDate.toLocaleDateString()} • ${EventDateFormatting.shortTime(eventEndDate)}` as const

    return `${startDateMessage} to ${endDateMessage}`
  }
} as const

/**
 * Static methods to perform comparions useful for the events
 */
export const EventDateComparisons = {
  /**
   * Logic for determining if the event has finished
   *
   * @param startDate date object corresponding to the event's start date timestamp
   * @param endDate date object corresponding to the event's start date timestamp, if exists
   *
   * @returns `true` if the event has finshed, `false` otherwise
   */
  isPastEvent: (startDate?: Date, endDate?: Date) => {
    const oneDayLater = new Date(Date.now() + 24 * 60 * 60 * MS_IN_SECOND)

    if (endDate) return endDate <= new Date()
    if (startDate) return startDate <= oneDayLater
    return false
  }
} as const

const EventDateFormatting = {
  /**
   * @example
   * ```
   * EventDateFormatting.shortDayName(new Date()) // 'Thu'
   * ```
   */
  shortDayName: (date: Date) => {
    return date.toLocaleDateString("en-NZ", {
      weekday: "short"
    })
  },
  /**
   * Returns a date in `dd/mm/yyyy` format
   *
   * @example
   * ```
   * EventDateFormatting.shortDate(new Date()) // '14/10/2024'
   * ```
   */
  shortDate: (date: Date) => {
    return date.toLocaleDateString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit"
    })
  },
  /**
   * Displays a date in the `hh:mm pm` format (12 hour time)
   *
   * @example
   * ```
   * EventDateFormatting.shortTime(new Date()) // '9:12 pm'
   * ```
   */
  shortTime: (date: Date) => {
    return date.toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }
} as const

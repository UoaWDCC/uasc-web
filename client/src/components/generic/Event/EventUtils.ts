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

export const EventDateComparisons = {
  isPastEvent: (startDate?: Date, endDate?: Date) => {
    const oneDayLater = new Date(Date.now() + 24 * 60 * 60 * MS_IN_SECOND)

    if (endDate) return endDate <= oneDayLater
    if (startDate) return startDate <= oneDayLater
    return false
  }
} as const

const EventDateFormatting = {
  shortDayName: (date: Date) => {
    return date.toLocaleDateString("en-NZ", {
      weekday: "short"
    })
  },
  shortDate: (date: Date) => {
    return date.toLocaleDateString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit"
    })
  },
  shortTime: (date: Date) => {
    return date.toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }
} as const

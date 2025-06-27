import { DateUtils } from "@/components/utils/DateUtils"
import type { Event } from "@/models/Events"
import { MS_IN_SECOND } from "@/utils/Constants"
import type {
  EventCardPreviewVariant,
  IEventsCardPreview
} from "./EventPreview/EventPreview"

export const IMAGE_PLACEHOLDER_SRC =
  "https://placehold.co/600x400?text=UASC+Event" as const

/**
 * Static methods to format strings related to events
 */
export const EventMessages = {
  /**
   * Message to be displayed for deleting an event
   *
   * @param title the title of the event
   * @returns a formatted, user-readable string asking for confirmation
   */
  adminDeleteEventConfirmation: (title: string) => {
    return `Are you sure you want to delete the event ${title}? This can NOT be undone!`
  },
  /**
   * Message to be displayed for confirming event creation or editing
   *
   * @param isEditing boolean indicating if the event is being edited
   * @param title the title of the event
   * @returns a formatted, user-readable string asking for confirmation
   */
  adminEventPostConfirmation: (isEditing: boolean, title: string) => {
    if (isEditing) {
      return `Are you sure you want to edit the event ${title}?`
    } else {
      return `Are you sure you want to create the new event with title ${title}?`
    }
  },
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
      return `Sign ups have opened! (${EventDateFormatting.getRelativeTimeString(signUpOpenDate)})` as const
    } else {
      return `Sign ups open ${EventDateFormatting.getRelativeTimeString(signUpOpenDate)} (${EventDateFormatting.shortDate(signUpOpenDate)})` as const
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
      `${EventDateFormatting.shortDayName(eventStartDate)} ${eventStartDate.toLocaleDateString("en-NZ")} • ${EventDateFormatting.shortTime(eventStartDate)}` as const

    if (!eventEndDate) {
      return startDateMessage
    }

    const endDateMessage =
      `${EventDateFormatting.shortDayName(eventEndDate)} ${eventEndDate.toLocaleDateString("en-NZ")} • ${EventDateFormatting.shortTime(eventEndDate)}` as const

    return `${startDateMessage} - ${endDateMessage}`
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

/**
 * Utility type to allow for a key to to be associated with a preview
 *
 * (generally using the firebase `uid`)
 */
export type EventCardPreviewWithKey = IEventsCardPreview & { key: string }

export const EventRenderingUtils = {
  /**
   * Generates a placeholder string for a local date and time input field
   *
   * @param date the date object to be formatted
   * @returns a formatted string in ISO 8601 format without milliseconds
   */
  dateTimeLocalPlaceHolder: (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${year}-${month}-${day}T${hours}:${minutes}`
  },
  /**
   * Utility function to convert a raw {@link Event} into {@link IEventsCardPreview}
   *
   * @param event the {@link Event} object to be transformed into the Preview Card props
   * @param eventSetter callback to do something with the selected event's `id`
   * @returns the props in the format of {@link IEventsCardPreview}
   */
  previewTransformer: (
    event: Event,
    eventSetter: (id?: string) => void,
    buttonText?: string,
    variant?: EventCardPreviewVariant
  ): EventCardPreviewWithKey => {
    let eventStartDate
    if (event.physical_start_date) {
      eventStartDate = new Date(
        DateUtils.timestampMilliseconds(event?.physical_start_date)
      )
    }

    let eventEndDate
    if (event.physical_end_date) {
      eventEndDate = new Date(
        DateUtils.timestampMilliseconds(event?.physical_end_date)
      )
    }

    let signUpStartDate
    if (event.sign_up_start_date) {
      signUpStartDate = new Date(
        DateUtils.timestampMilliseconds(event.sign_up_start_date)
      )
    }

    return {
      key: event.id || event.title,
      date: eventStartDate
        ? EventMessages.eventDateRange(eventStartDate, eventEndDate)
        : "",
      image: event?.image_url || IMAGE_PLACEHOLDER_SRC,
      title: event?.title || "",
      location: event?.location,
      signUpOpenDate: signUpStartDate
        ? EventMessages.signUpOpen(signUpStartDate)
        : undefined,
      isPastEvent: EventDateComparisons.isPastEvent(
        eventStartDate,
        eventEndDate
      ),
      onClick: () => {
        eventSetter(event.id)
      },
      viewButtonText: buttonText,
      isMembersOnly: event.is_members_only,
      variant
    }
  }
}

const EventDateFormatting = {
  /**
   * Convert a date to a relative time string, such as
   * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
   * using Intl.RelativeTimeFormat
   *
   * credit to [builder.io](https://www.builder.io/blog/relative-time)
   */
  getRelativeTimeString: (
    date: Date | number,
    lang = navigator.language
  ): string => {
    // Allow dates or times to be passed
    const timeMs = typeof date === "number" ? date : date.getTime()

    // Get the amount of seconds between the given date and now
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

    // Array reprsenting one minute, hour, day, week, month, etc in seconds
    const cutoffs = [
      60,
      3600,
      86400,
      86400 * 7,
      86400 * 30,
      86400 * 365,
      Infinity
    ]

    // Array equivalent to the above but in the string representation of the units
    const units: Intl.RelativeTimeFormatUnit[] = [
      "second",
      "minute",
      "hour",
      "day",
      "week",
      "month",
      "year"
    ]

    // Grab the ideal cutoff unit
    const unitIndex = cutoffs.findIndex(
      (cutoff) => cutoff > Math.abs(deltaSeconds)
    )

    // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
    // is one day in seconds, so we can divide our seconds by this to get the # of days
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

    // Intl.RelativeTimeFormat do its magic
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" })
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
  },
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

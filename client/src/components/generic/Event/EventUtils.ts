export const EventMessages = {
  signUpOpen: (signUpOpenDate: Date) => {
    const currentDate = new Date()

    // Sign Ups have opened
    if (signUpOpenDate <= currentDate) {
      return `Sign ups have opened! (Since ${EventDateFormatting.shortDate(signUpOpenDate)})` as const
    } else {
      return `Sign up opens at ${EventDateFormatting.shortDate(signUpOpenDate)}` as const
    }
  },
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

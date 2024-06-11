import { Timestamp } from "firebase-admin/firestore"

// Need to validate the booking date through a startDate and endDate range.
const earliestDate = new Date()
earliestDate.setUTCHours(0, 0, 0, 0)
const latestDate = new Date(earliestDate)
latestDate.setFullYear(earliestDate.getFullYear() + 1)

const BookingUtils = {
  validateStartAndEndDates: function (
    startDate: Timestamp,
    endDate: Timestamp
  ) {
    return (
      endDate.seconds < startDate.seconds ||
      startDate.seconds * 1000 < earliestDate.getTime() ||
      endDate.seconds * 1000 > latestDate.getTime()
    )
  }
} as const

export default BookingUtils

import { useQuery } from "@tanstack/react-query"
import { Timestamp } from "firebase/firestore"
import BookingService from "./BookingService"

export const BOOKING_AVAILABLITY_KEY = "booking-availablity" as const

/**
 * Need to remove time data from this
 */
let TODAY = new Date()
TODAY = new Date(TODAY.toDateString())

/**
 * Need to remove time data from this (k)
 */
let NEXT_YEAR_FROM_TODAY = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
)
NEXT_YEAR_FROM_TODAY = new Date(NEXT_YEAR_FROM_TODAY.toDateString())

export function useAvailableBookingsQuery(
  startDate: Timestamp = Timestamp.fromDate(TODAY),
  endDate: Timestamp = Timestamp.fromDate(NEXT_YEAR_FROM_TODAY)
) {
  return useQuery({
    queryKey: [BOOKING_AVAILABLITY_KEY, startDate, endDate],
    queryFn: () => BookingService.getBookingAvailability(startDate, endDate)
  })
}

import { useQuery } from "@tanstack/react-query"
import { Timestamp } from "firebase/firestore"
import BookingService from "./BookingService"
import { TODAY, NEXT_YEAR_FROM_TODAY } from "utils/Constants"

export const BOOKING_AVAILABLITY_KEY = "booking-availablity" as const
export const BOOKINGS_SELF_KEY = "booking-self" as const

export function useAvailableBookingsQuery(
  startDate: Timestamp = Timestamp.fromDate(TODAY),
  endDate: Timestamp = Timestamp.fromDate(NEXT_YEAR_FROM_TODAY),
  staleTime: number = 15000 // 15 seconds
) {
  return useQuery({
    staleTime,
    queryKey: [BOOKING_AVAILABLITY_KEY, startDate, endDate],
    queryFn: () => BookingService.getBookingAvailability(startDate, endDate)
  })
}

export function useBookingsForSelfQuery() {
  return useQuery({
    queryKey: [BOOKINGS_SELF_KEY],
    queryFn: BookingService.getSelfBookings
  })
}

import { BookingContext } from "@/components/composite/Booking/BookingContext"
import SuccessfulBooking from "@/components/composite/SuccessfulBooking/SuccessfulBooking"
import { useUserLoggedInCallback } from "@/hooks/useUserLoggedInCallback"
import { useSearchParams } from "next/navigation"
import { useCallback, useContext } from "react"

const BookingSuccess = () => {
  const searchParams = useSearchParams()
  const { forceRefreshBookings } = useContext(BookingContext)
  const forceRefreshBookingsCallback = useCallback(
    () => forceRefreshBookings?.(),
    [forceRefreshBookings]
  )
  useUserLoggedInCallback(forceRefreshBookingsCallback)
  const startDate = searchParams.get("startDate") ?? ""
  const endDate = searchParams.get("endDate") ?? ""
  return <SuccessfulBooking startDate={startDate} endDate={endDate} />
}

export default BookingSuccess

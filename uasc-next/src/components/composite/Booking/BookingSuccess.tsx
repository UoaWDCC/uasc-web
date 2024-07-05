import { BookingContext } from "@/components/composite/Booking/BookingContext"
import SuccessfulBooking from "@/components/composite/SuccessfulBooking/SuccessfulBooking"
import { useUserLoggedInCallback } from "@/hooks/useUserLoggedInCallback"
import { useSearchParams } from "next/navigation"
import { useContext } from "react"

const BookingSuccess = () => {
  const searchParams = useSearchParams()
  const { forceRefreshBookings } = useContext(BookingContext)
  useUserLoggedInCallback(() => forceRefreshBookings?.())
  const startDate = searchParams.get("startDate") ?? ""
  const endDate = searchParams.get("endDate") ?? ""
  return <SuccessfulBooking startDate={startDate} endDate={endDate} />
}

export default BookingSuccess

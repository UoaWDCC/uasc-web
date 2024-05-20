import SuccessfulBooking from "components/composite/SuccessfulBooking/SuccessfulBooking"
import { useSearchParams } from "react-router-dom"

const BookingSuccess = () => {
  const [searchParams] = useSearchParams()
  const startDate = searchParams.get("startDate") ?? ""
  const endDate = searchParams.get("endDate") ?? ""
  return <SuccessfulBooking startDate={startDate} endDate={endDate} />
}

export default BookingSuccess

import { PaymentForm } from "components/generic/PaymentComponent/PaymentForm"
import { Navigate } from "react-router-dom"

interface IBookingPayment {
  clientSecret?: string
}

const BookingPayment = ({ clientSecret }: IBookingPayment) => {
  if (!clientSecret) return <Navigate to="/bookings" />
  return <PaymentForm onComplete={() => {}} clientSecret={clientSecret} />
}

export default BookingPayment

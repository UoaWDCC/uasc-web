import { PaymentForm } from "components/generic/PaymentComponent/PaymentForm"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { BookingContext } from "../BookingContext"

interface IBookingPayment {
  clientSecret?: string
}

const BookingPayment = ({ clientSecret }: IBookingPayment) => {
  const { message } = useContext(BookingContext)
  if (!clientSecret) return <Navigate to="/bookings" />
  return (
    <>
      {message && (
        <div className="border-gray-3 mb-2 rounded-sm border bg-white p-4">
          <h5>{message}</h5>
        </div>
      )}
      <PaymentForm onComplete={() => {}} clientSecret={clientSecret} />
    </>
  )
}

export default BookingPayment

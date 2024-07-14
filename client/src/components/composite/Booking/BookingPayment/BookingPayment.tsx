import { PaymentForm } from "@/components/generic/PaymentComponent/PaymentForm"
import { useContext } from "react"
import { BookingContext } from "../BookingContext"
import { useRouter } from "next/navigation"

interface IBookingPayment {
  clientSecret?: string
}

const BookingPayment = ({ clientSecret }: IBookingPayment) => {
  const { message } = useContext(BookingContext)
  const router = useRouter()
  if (!clientSecret) {
    router.push("/bookings")
    return null
  }

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

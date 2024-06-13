import { Timestamp } from "firebase/firestore"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"
import { useBookingPaymentClientSecretMutation } from "services/Payment/PaymentMutations"

interface IBookingContext {
  handleBookingCreation?: (startDate: Timestamp, endDate: Timestamp) => void
  clientSecret?: string
  getExistingSession?: () => void
  message?: string
  isPending?: boolean
}

export const BookingContext = createContext<IBookingContext>({})

export const BookingContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const navigate = useNavigate()
  const {
    data: bookingPaymentData,
    mutateAsync,
    isPending
  } = useBookingPaymentClientSecretMutation()

  const getExistingSession = async () => {
    if (bookingPaymentData?.stripeClientSecret) navigate("/bookings/payment")
    await mutateAsync(
      {},
      {
        onSuccess() {
          navigate("/bookings/payment")
        }
      }
    )
  }

  const handleBookingCreation = async (
    startDate: Timestamp,
    endDate: Timestamp
  ) => {
    await mutateAsync(
      { startDate, endDate },
      {
        onSuccess() {
          navigate("/bookings/payment")
        }
      }
    )
  }

  return (
    <BookingContext.Provider
      value={{
        clientSecret: bookingPaymentData?.stripeClientSecret,
        message: bookingPaymentData?.message,
        handleBookingCreation,
        getExistingSession,
        isPending
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

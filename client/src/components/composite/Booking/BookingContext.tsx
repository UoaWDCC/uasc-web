import { Timestamp } from "firebase/firestore"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"
import { BOOKING_AVAILABLITY_KEY } from "services/Booking/BookingQueries"
import { useBookingPaymentClientSecretMutation } from "services/Payment/PaymentMutations"
import queryClient from "services/QueryClient"

interface IBookingContext {
  handleBookingCreation?: (startDate?: Timestamp, endDate?: Timestamp) => void
  clientSecret?: string
  getExistingSession?: () => void
  forceRefreshBookings?: () => void
  message?: string
  isPending?: boolean
  errorMessage?: string
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
    isPending,
    error
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
  const forceRefreshBookings = () => {
    queryClient.invalidateQueries({ queryKey: [BOOKING_AVAILABLITY_KEY] })
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
        isPending,
        forceRefreshBookings,
        errorMessage:
          error?.name === "UnavailableBookingError" ? error?.message : undefined
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

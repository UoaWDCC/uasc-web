import { Timestamp } from "firebase/firestore"
import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BOOKING_AVAILABLITY_KEY } from "services/Booking/BookingQueries"
import { useBookingPaymentClientSecretMutation } from "services/Payment/PaymentMutations"
import queryClient from "services/QueryClient"
import { useEditSelfMutation } from "services/User/UserMutations"

interface IBookingContext {
  /**
   * @param startDate to request the session for
   * @param endDate  to request the session for
   */
  handleBookingCreation?: (startDate?: Timestamp, endDate?: Timestamp) => void
  /**
   * Used to initiate the checkout component for bookings
   */
  clientSecret?: string
  /**
   * Called to try retrieve any existing sessions for the use
   */
  getExistingSession?: () => void
  /**
   * Invalidates the currently stored booking availability
   */
  forceRefreshBookings?: () => void
  /**
   * Used when the user inputs into the dietary requiements box
   * @param newAllergies the new updated information to overwrite the users old
   * `dietary_requirements` field
   */
  setAllergies?: (newAllergies: string) => void
  /**
   * Description of information from server
   */
  message?: string
  /**
   * If there is a currently undergoing operation
   */
  isPending?: boolean
  /**
   * Parsed message describing problems arising from a network call
   */
  errorMessage?: string
}

/**
 * Should wrap all pages in the bookings route
 */
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

  const [allergies, setAllergies] = useState<string>("")

  const { mutateAsync: updateAllergies } = useEditSelfMutation({
    dietary_requirements: allergies
  })

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
    await updateAllergies()
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
        setAllergies,
        forceRefreshBookings,
        errorMessage:
          error?.name === "UnavailableBookingError" ? error?.message : undefined
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

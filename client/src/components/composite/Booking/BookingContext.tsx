import { fireAnalytics } from "@/firebase"
import type { Timestamp } from "firebase/firestore"
import { createContext, useState } from "react"
import { BOOKING_AVAILABLITY_KEY } from "@/services/Booking/BookingQueries"
import { useBookingPaymentClientSecretMutation } from "@/services/Payment/PaymentMutations"
import queryClient from "@/services/QueryClient"
import { useEditSelfMutation } from "@/services/User/UserMutations"
import type { Policies } from "@/models/sanity/Policies/Utils"
import { useRouter } from "next/navigation"

export type PolicyWithTextBlocks = Omit<Policies, "information"> & {
  information: JSX.Element
}

interface IBookingContext {
  /**
   * @param startDate **UTC Midnight** date to request the session for
   * @param endDate **UTC Midnight** date to request the session for
   */
  handleBookingCreation?: (startDate?: Timestamp, endDate?: Timestamp) => void
  /**
   * Used to initiate the checkout :omponent for bookings
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

  /**
   * Booking Policy Items fetched from Sanity
   */
  policies?: PolicyWithTextBlocks[]

  /**
   * Setter function for the booking policies
   */
  setPolicies?: (newPolicies: PolicyWithTextBlocks[]) => void
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
  const router = useRouter()
  const {
    data: bookingPaymentData,
    mutateAsync,
    isPending,
    error
  } = useBookingPaymentClientSecretMutation()

  const [policies, setPolicies] = useState<PolicyWithTextBlocks[]>([])

  const [allergies, setAllergies] = useState<string>("")

  const { mutateAsync: updateAllergies } = useEditSelfMutation()

  const getExistingSession = async () => {
    if (bookingPaymentData?.stripeClientSecret) router.push("/bookings/payment")
    await mutateAsync(
      {},
      {
        onSuccess() {
          router.push("/bookings/payment")
        }
      }
    )
  }
  const forceRefreshBookings = () => {
    queryClient.invalidateQueries({ queryKey: [BOOKING_AVAILABLITY_KEY] })
  }

  const handleBookingCreation = async (
    startDate?: Timestamp,
    endDate?: Timestamp
  ) => {
    await updateAllergies({ dietary_requirements: allergies })
    await mutateAsync(
      { startDate, endDate },
      {
        onSuccess() {
          router.push("/bookings/payment")
        }
      }
    )
    fireAnalytics("add_to_cart", { payment_type: "booking" })
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
        policies,
        setPolicies,
        errorMessage:
          error?.name === "UnavailableBookingError" ? error?.message : undefined
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

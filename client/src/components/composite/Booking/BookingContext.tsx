import { Timestamp } from "firebase/firestore"
import { createContext } from "react"
import { useBookingPaymentClientSecretMutation } from "services/Payment/PaymentMutations"

interface IBookingContext {
  handleBookingCreation?: (startDate: Timestamp, endDate: Timestamp) => void
  clientSecret?: string
}

export const BookingContext = createContext<IBookingContext>({})

export const BookingContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { data: bookingPaymentData, mutateAsync } =
    useBookingPaymentClientSecretMutation()

  const handleBookingCreation = async (
    startDate: Timestamp,
    endDate: Timestamp
  ) => {
    await mutateAsync({ startDate, endDate })
  }

  return (
    <BookingContext.Provider
      value={{
        clientSecret: bookingPaymentData?.stripeClientSecret,
        handleBookingCreation
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

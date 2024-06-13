import { useAppData } from "store/Store"
import { SignUpNotif } from "components/generic/SignUpNotif/SignUpNotif"
import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"
import { CreateBookingSection } from "./BookingCreation"
import { useContext } from "react"
import { BookingContext } from "../BookingContext"

export const ProtectedCreateBookingSection = () => {
  const [{ currentUser, currentUserClaims }] = useAppData()
  const { data } = useAvailableBookingsQuery()
  if (!currentUserClaims?.member) {
    return <SignUpNotif signedIn={!!currentUser} />
  }

  const { handleBookingCreation, clientSecret } = useContext(BookingContext)

  return (
    <CreateBookingSection
      bookingSlots={data}
      handleBookingCreation={handleBookingCreation}
      hasExistingSession={!!clientSecret}
    />
  )
}

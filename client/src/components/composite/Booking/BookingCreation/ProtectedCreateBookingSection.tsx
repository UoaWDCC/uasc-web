import { useAppData } from "store/Store"
import { SignUpNotif } from "components/generic/SignUpNotif/SignUpNotif"
import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"
import { CreateBookingSection } from "./BookingCreation"
import { useContext, useEffect } from "react"
import { BookingContext } from "../BookingContext"

export const ProtectedCreateBookingSection = () => {
  const [{ currentUser, currentUserClaims }] = useAppData()

  const { data, isLoading } = useAvailableBookingsQuery()
  const {
    handleBookingCreation,
    clientSecret,
    errorMessage,
    setAllergies,
    isPending
  } = useContext(BookingContext)

  useEffect(() => {
    if (errorMessage) alert(errorMessage)
  }, [errorMessage])

  if (!currentUserClaims?.member) {
    return <SignUpNotif signedIn={!!currentUser} />
  }

  return (
    <CreateBookingSection
      bookingSlots={data}
      handleBookingCreation={handleBookingCreation}
      handleAllergyChange={setAllergies}
      hasExistingSession={!!clientSecret}
      isPending={isPending || isLoading}
    />
  )
}

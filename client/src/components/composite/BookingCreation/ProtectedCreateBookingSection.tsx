import { useAppData } from "store/Store"
import { SignUpNotif } from "components/generic/SignUpNotif/SignUpNotif"
import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"
import { CreateBookingSection } from "./BookingCreation"

export const ProtectedCreateBookingSection = () => {
  const [{ currentUser, currentUserClaims }] = useAppData()
  const { data } = useAvailableBookingsQuery()
  if (!currentUserClaims?.member) {
    return <SignUpNotif signedIn={!!currentUser} />
  }
  return <CreateBookingSection bookingSlots={data} />
}

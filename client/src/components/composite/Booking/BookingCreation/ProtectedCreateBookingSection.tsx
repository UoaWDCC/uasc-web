"use client"

import { useContext, useEffect } from "react"
import { SignUpNotif } from "@/components/generic/SignUpNotif/SignUpNotif"
import { useAvailableBookingsQuery } from "@/services/Booking/BookingQueries"
import { useSelfDataQuery } from "@/services/User/UserQueries"
import { useAppData } from "@/store/Store"
import { BookingContext } from "../BookingContext"
import {
  CreateBookingSection,
  type ICreateBookingSection
} from "./BookingCreation"

/**
 * @deprecated not for direct consumption on pages, use `BookingInformationAndCreation` instead
 */
export const ProtectedCreateBookingSection = ({
  lodgePrices
}: Pick<ICreateBookingSection, "lodgePrices">) => {
  const [{ currentUser, currentUserClaims }] = useAppData()

  const { data } = useAvailableBookingsQuery()

  const { data: currentUserData } = useSelfDataQuery()

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
      userEmergencyContact={currentUserData?.emergency_contact}
      handleAllergyChange={setAllergies}
      hasExistingSession={!!clientSecret}
      isPending={isPending}
      lodgePrices={lodgePrices}
    />
  )
}

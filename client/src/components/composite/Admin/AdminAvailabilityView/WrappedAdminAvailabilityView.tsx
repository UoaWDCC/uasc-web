import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"
import AdminAvailabilityView from "./AdminAvailabilityView"
import {
  useMakeDatesAvailableMutation,
  useMakeDatesUnavailableMutation
} from "services/Admin/AdminMutations"
import { useContext } from "react"
import { DateSelectionContext } from "./DateSelectionContext"

export const WrappedAdminAvailabilityView = () => {
  const { data } = useAvailableBookingsQuery()

  const { selectedDates } = useContext(DateSelectionContext)
  const { mutateAsync: makeAvailableMutation } = useMakeDatesAvailableMutation(
    selectedDates.startDate,
    selectedDates.endDate
  )

  const { mutateAsync: makeUnavailableMutation } =
    useMakeDatesUnavailableMutation(
      selectedDates.startDate,
      selectedDates.endDate
    )

  return (
    <>
      <AdminAvailabilityView
        handleMakeAvailable={async () => {
          await makeAvailableMutation()
        }}
        handleMakeUnavailable={async () => {
          await makeUnavailableMutation()
        }}
        slots={data}
      />
    </>
  )
}

export default WrappedAdminAvailabilityView

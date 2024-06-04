import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"
import AdminAvailabilityView from "./AdminAvailabilityView"
import { useMakeDatesAvailableMutation } from "services/Admin/AdminMutations"
import { useContext } from "react"
import { DateSelectionContext } from "./DateSelectionContext"

export const WrappedAdminAvailabilityView = () => {
  const { data } = useAvailableBookingsQuery()

  const { selectedDates } = useContext(DateSelectionContext)
  const { mutateAsync } = useMakeDatesAvailableMutation(
    selectedDates.startDate,
    selectedDates.endDate
  )

  return (
    <>
      <AdminAvailabilityView
        handleMakeAvailable={async () => {
          await mutateAsync()
        }}
        slots={data}
      />
    </>
  )
}

export default WrappedAdminAvailabilityView

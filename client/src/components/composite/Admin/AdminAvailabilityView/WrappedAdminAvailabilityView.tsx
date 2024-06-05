import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"
import AdminAvailabilityView from "./AdminAvailabilityView"
import {
  useMakeDatesAvailableMutation,
  useMakeDatesUnavailableMutation
} from "services/Admin/AdminMutations"
import { useContext } from "react"
import { DateSelectionContext } from "./DateSelectionContext"

/**
 * This must be wrapped in a `DateSelectionProvider`
 */
export const WrappedAdminAvailabilityView = () => {
  const { data } = useAvailableBookingsQuery()

  const {
    selectedDates: { startDate, endDate },
    setIsUpdating,
    slotQty: slots
  } = useContext(DateSelectionContext)
  const { mutateAsync: makeAvailableMutation } = useMakeDatesAvailableMutation(
    startDate,
    endDate,
    slots
  )

  const { mutateAsync: makeUnavailableMutation } =
    useMakeDatesUnavailableMutation(startDate, endDate)

  return (
    <>
      <AdminAvailabilityView
        handleMakeAvailable={async () => {
          setIsUpdating?.(true)
          await makeAvailableMutation()
          setIsUpdating?.(false)
        }}
        handleMakeUnavailable={async () => {
          setIsUpdating?.(true)
          await makeUnavailableMutation()
          setIsUpdating?.(false)
        }}
        slots={data}
      />
    </>
  )
}

export default WrappedAdminAvailabilityView

import { Timestamp } from "firebase/firestore"
import { useContext } from "react"
import { DateUtils } from "@/components/utils/DateUtils"
import {
  useMakeDatesAvailableMutation,
  useMakeDatesUnavailableMutation
} from "@/services/Admin/AdminMutations"
import { useAvailableBookingsQuery } from "@/services/Booking/BookingQueries"
import AdminAvailabilityView from "./AdminAvailabilityView"
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

  const _startDate =
    startDate &&
    Timestamp.fromDate(DateUtils.convertLocalDateToUTCDate(startDate))
  const _endDate =
    endDate && Timestamp.fromDate(DateUtils.convertLocalDateToUTCDate(endDate))

  const { mutateAsync: makeAvailableMutation } = useMakeDatesAvailableMutation(
    _startDate,
    _endDate,
    slots
  )

  const { mutateAsync: makeUnavailableMutation } =
    useMakeDatesUnavailableMutation(_startDate, _endDate)

  return (
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
  )
}

export default WrappedAdminAvailabilityView

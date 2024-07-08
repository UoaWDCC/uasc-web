import { useAdminBookingsQuery } from "services/Admin/AdminQueries"
import { AdminBookingView, BookingMemberColumnFormat } from "./AdminBookingView"
import { DateUtils } from "components/utils/DateUtils"
import { AdminBookingViewContext } from "./AdminBookingViewContext"
import { useContext, useMemo } from "react"
import { Timestamp } from "firebase/firestore"
import { TableRowOperation } from "components/generic/ReusableTable/TableUtils"
import { useDeleteBookingMutation } from "services/Admin/AdminMutations"

/**
 * Should be wrapped the `AdminBookingViewProvider`
 */
const WrappedAdminBookingView = () => {
  const {
    selectedDates: { startDate, endDate },
    handleSelectedDateChange
  } = useContext(AdminBookingViewContext)

  const { data, isLoading: isFetchingUsers } = useAdminBookingsQuery(
    Timestamp.fromDate(DateUtils.convertLocalDateToUTCDate(startDate)),
    Timestamp.fromDate(DateUtils.convertLocalDateToUTCDate(endDate))
  )
  const dataList = data?.flatMap(
    (date) =>
      date.users.map((user) => {
        const newData: BookingMemberColumnFormat = {
          uid: ""
        }
        newData.uid = user.bookingId
        newData.Date = DateUtils.formattedNzDate(
          new Date(DateUtils.timestampMilliseconds(date.date))
        )
        newData.Name = `${user.first_name} ${user.last_name}`
        newData.Number = user.phone_number ? user.phone_number.toString() : ""
        newData.Email = user.email
        newData["Dietary Requirement"] = user.dietary_requirements
        return newData
      }) || []
  )
  const sortedData = useMemo(
    () =>
      dataList?.sort(
        (a, b) =>
          DateUtils.nzDateStringToMillis(a.Date || "00/00/0000") -
          DateUtils.nzDateStringToMillis(b.Date || "00/00/0000")
      ),
    [dataList]
  )

  const { mutateAsync: deleteBooking, isPending: isDeletingBooking } =
    useDeleteBookingMutation()
  const rowOperations: [TableRowOperation] = [
    {
      name: "delete booking",
      handler: (bookingId: string) => {
        const matchingBooking = sortedData?.find(
          (data) => data.uid === bookingId
        )
        if (
          confirm(
            `Are you SURE you want to delete the booking for the user ${matchingBooking?.Email} on the date ${matchingBooking?.Date}?
             This can NOT be undone!
            `
          )
        ) {
          deleteBooking(bookingId)
        }
      }
    }
  ]

  return (
    <AdminBookingView
      isUpdating={isFetchingUsers || isDeletingBooking}
      data={sortedData}
      rowOperation={rowOperations}
      dateRange={{ startDate, endDate }}
      handleDateRangeChange={handleSelectedDateChange}
    />
  )
}

export default WrappedAdminBookingView

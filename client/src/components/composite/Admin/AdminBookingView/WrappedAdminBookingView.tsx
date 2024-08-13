import { useAdminBookingsQuery } from "@/services/Admin/AdminQueries"
import { AdminBookingView } from "./AdminBookingView"
import { DateUtils } from "@/components/utils/DateUtils"
import { AdminBookingViewContext } from "./AdminBookingViewContext"
import { useContext, useMemo } from "react"
import { Timestamp } from "firebase/firestore"
import { useDeleteBookingMutation } from "@/services/Admin/AdminMutations"
import { IAdminBookingDate } from "./AdminBookingDateDisplay/AdminBookingDate/AdminBookingDate"
import Messages from "@/services/Utils/Messages"
import { compareStrings } from "@/services/Admin/AdminUtils"

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

  const { mutateAsync: deleteBooking, isPending: isDeletingBooking } =
    useDeleteBookingMutation()
  /**
   * This chooses the fields to display on the booking view table
   *
   * Any field additions/deletions require changing `BookingMemberColumnFormat`
   */
  const dataList = useMemo(
    (): IAdminBookingDate[] =>
      data?.map((date) => {
        const bookingDateObject = new Date(
          DateUtils.timestampMilliseconds(date.date)
        )
        const bookingDate = DateUtils.formattedNzDate(bookingDateObject)

        /**
         * Users should be displayed in ascending alphabetical order
         *
         * i.e _Alex_ comes before _John
         */
        const sortedUsers = date.users.sort((a, b) =>
          compareStrings(a.first_name, b.first_name)
        )

        return {
          dateString: bookingDate,
          dayName: bookingDateObject.toLocaleDateString("en-NZ", {
            weekday: "long"
          }),
          users: sortedUsers,
          handleUserDelete: (bookingId) => {
            if (
              confirm(
                Messages.deleteUserFromBooking(
                  date.users.find((user) => user.bookingId === bookingId)
                    ?.email,
                  bookingDate
                )
              )
            ) {
              deleteBooking(bookingId)
            }
          }
        }
      }) || [],
    [data, deleteBooking]
  )
  const sortedData = useMemo(
    () =>
      dataList?.sort(
        (a, b) =>
          DateUtils.nzDateStringToMillis(a.dateString || "00/00/0000") -
          DateUtils.nzDateStringToMillis(b.dateString || "00/00/0000")
      ),
    [dataList]
  )

  return (
    <AdminBookingView
      isUpdating={isFetchingUsers || isDeletingBooking}
      data={sortedData}
      dateRange={{ startDate, endDate }}
      handleDateRangeChange={handleSelectedDateChange}
    />
  )
}

export default WrappedAdminBookingView

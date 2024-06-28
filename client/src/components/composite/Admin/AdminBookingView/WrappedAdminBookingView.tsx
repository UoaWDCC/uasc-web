import { useAdminBookingsQuery } from "services/Admin/AdminQueries"
import { AdminBookingView, BookingMemberColumnFormat } from "./AdminBookingView"
import { DateUtils } from "components/utils/DateUtils"
import { AdminBookingViewContext } from "./AdminBookingViewContext"
import { useContext, useMemo } from "react"
import { Timestamp } from "firebase/firestore"

/**
 * Should be wrapped the `AdminBookingViewProvider`
 */
const WrappedAdminBookingView = () => {
  const {
    selectedDates: { startDate, endDate },
    handleSelectedDateChange
  } = useContext(AdminBookingViewContext)

  const { data, isLoading } = useAdminBookingsQuery(
    Timestamp.fromDate(DateUtils.convertLocalDateToUTCDate(startDate)),
    Timestamp.fromDate(DateUtils.convertLocalDateToUTCDate(endDate))
  )
  const dataList = data?.flatMap(
    (date) =>
      date.users.map((user) => {
        const newData: BookingMemberColumnFormat = {
          uid: ""
        }
        newData.uid = user.uid
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
          DateUtils.nzDateToTime(a.Date || "00/00/0000") -
          DateUtils.nzDateToTime(b.Date || "00/00/0000")
      ),
    [dataList]
  )
  return (
    <AdminBookingView
      isUpdating={isLoading}
      data={sortedData}
      dateRange={{ startDate, endDate }}
      handleDateRangeChange={handleSelectedDateChange}
    />
  )
}

export default WrappedAdminBookingView

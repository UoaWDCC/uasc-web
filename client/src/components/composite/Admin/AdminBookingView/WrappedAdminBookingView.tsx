import { useAdminBookingsQuery } from "services/Admin/AdminQueries"
import { AdminBookingView, BookingMemberColumnFormat } from "./AdminBookingView"
import { timestampToDate } from "components/utils/Utils"
import { AdminBookingViewContext } from "./AdminBookingViewContext"
import { useContext } from "react"

const WrappedAdminBookingView = () => {
  const {
    selectedDates: { startDate, endDate },
    handleSelectedDateChange
  } = useContext(AdminBookingViewContext)

  const { data } = useAdminBookingsQuery(startDate, endDate)
  const dataList = data?.flatMap(
    (date) =>
      date.users.map((user) => {
        const newData: BookingMemberColumnFormat = {
          uid: ""
        }
        newData.uid = user.uid
        newData.Date = timestampToDate(date.date).toLocaleDateString("en-NZ")
        newData.Name = `${user.first_name} ${user.last_name}`
        newData.Number = user.phone_number ? user.phone_number.toString() : ""
        newData.Email = user.email
        newData["Dietary Requirement"] = user.dietary_requirements
        return newData
      }) || []
  )
  return (
    <AdminBookingView
      data={dataList}
      dateRange={{ startDate, endDate }}
      handleDateRangeChange={handleSelectedDateChange}
    />
  )
}

export default WrappedAdminBookingView
import { useAdminBookingsQuery } from "services/Admin/AdminQueries"
import { AdminBookingView } from "./AdminBookingView"

const WrappedAdminBookingView = () => {
  const { data } = useAdminBookingsQuery()
  const dataList = data?.flatMap((date) => {
    date.users.map((user) => {
        user.uid,
        user.dateJoined,
        user.first_name,
        user.phone_number,
        user.email
      
    })
  })
  return dataList
}

export default WrappedAdminBookingView

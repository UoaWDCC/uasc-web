import { useAdminBookingsQuery } from "services/Admin/AdminQueries"
import { AdminBookingView } from "./AdminBookingView"
const WrappedAdminBookingView = () => {
    const {data} = useAdminBookingsQuery()
  return <AdminBookingView data={}/>
}
export default WrappedAdminBookingView

import { useAdminBookingsQuery } from "services/Admin/AdminQueries"
const WrappedAdminBookingView = () => {
  const { data } = useAdminBookingsQuery()

  return <WrappedAdminBookingView />
}
export default WrappedAdminBookingView

import { WrappedTab } from "../Navbar/utils/WrappedTab"

const AdminNavbar = () => {
  return (
    <div className="flex h-[46px] w-full overflow-hidden border border-black">
      <WrappedTab to="/members">members</WrappedTab>
      <WrappedTab to="/bookings">bookings</WrappedTab>
      <WrappedTab to="/payments">payments</WrappedTab>
    </div>
  )
}

export default AdminNavbar

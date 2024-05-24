import { WrappedTab } from "../Navbar/utils/WrappedTab"

const AdminNavbar = () => {
  return (
    <div className="flex h-[46px] w-full items-center overflow-hidden border">
      <div className="flex gap-4 pl-4 pt-[13px] ">
        <WrappedTab to="/members">members</WrappedTab>
        <WrappedTab to="/bookings">bookings</WrappedTab>
        <WrappedTab to="/payments">payments</WrappedTab>
      </div>
    </div>
  )
}

export default AdminNavbar

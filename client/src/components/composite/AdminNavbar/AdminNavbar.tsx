import { Link } from "react-router-dom"
import { WrappedTab } from "../Navbar/utils/WrappedTab"

const AdminNavbar = () => {
  return (
    <div className="flex h-[46px] w-full overflow-hidden border border-black">
      <WrappedTab to="/members">members</WrappedTab>

      <Link to="/bookings">
        <h5>bookings</h5>
      </Link>

      <Link to="/payments">
        <h5>payments</h5>
      </Link>
    </div>
  )
}

export default AdminNavbar

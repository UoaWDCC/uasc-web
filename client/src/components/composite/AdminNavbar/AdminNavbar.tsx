import { Link } from "react-router-dom"

const AdminNavbar = () => {
  return (
    <div className="flex h-[46px] w-full overflow-hidden border border-black">
      <div className="flex items-center justify-items-start gap-6 pl-[10%] uppercase">
        <Link to="/members">
          <h5>Members</h5>
        </Link>

        <Link to="/booking">
          <h5>bookings</h5>
        </Link>

        <Link to="/payments">
          <h5>payments</h5>
        </Link>
      </div>
    </div>
  )
}

export default AdminNavbar

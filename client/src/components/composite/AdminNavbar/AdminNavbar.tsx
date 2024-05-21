import { Link } from "react-router-dom"

const AdminNavbar = () => {
  return (
    <div className="flex h-[46px] w-full overflow-hidden border border-black">
      <div className="flex items-center justify-items-start gap-6 pl-[10%] uppercase">
        <Link to="/about">
          <h5>Members</h5>
        </Link>

        <h5>bookings</h5>
        <h5>payments</h5>
      </div>
    </div>
  )
}

export default AdminNavbar

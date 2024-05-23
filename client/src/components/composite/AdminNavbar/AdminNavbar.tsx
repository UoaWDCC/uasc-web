import { Link } from "react-router-dom"
import { useState } from "react"
const AdminNavbar = () => {
  const [activeLink, setActiveLink] = useState<string>("")

  const handleClick = (link: string) => {
    if (activeLink !== link) {
      setActiveLink(link)
    }
  }

  return (
    <div className="flex h-[46px] w-full overflow-hidden border border-black">
      <div className="flex items-center justify-items-start gap-6 pl-[10%] uppercase">
        <Link to="/members">
          <h5
            className={activeLink ? "text-light-blue-100" : "text-black"}
            onClick={() => handleClick("/members")}
          >
            Members
          </h5>
        </Link>

        <Link to="/bookings">
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

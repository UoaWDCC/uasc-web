import { Link } from "react-router-dom"
import { useState } from "react"
const AdminNavbar = () => {
  const [clicked, setClicked] = useState<boolean>(false)

  return (
    <div className="flex h-[46px] w-full overflow-hidden border border-black">
      <div className="flex items-center justify-items-start gap-6 pl-[10%] uppercase">
        <Link to="/members">
          <h5
            className={clicked ? "text-light-blue-100" : "text-black"}
            onClick={() => setClicked(!clicked)}
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

        <div
          className={`ml-auto block h-[20px] w-[24px] cursor-pointer md:hidden
          ${clicked ? "stroke-light-blue-100" : "stroke-black"} " pt-[5px]`}
        ></div>
      </div>
    </div>
  )
}

export default AdminNavbar

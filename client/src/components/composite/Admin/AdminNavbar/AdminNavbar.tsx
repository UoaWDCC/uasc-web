import { WrappedTab } from "../../Navbar/utils/WrappedTab"
import { useNavigate } from "react-router-dom"
const Exit = () => {
  const navigate = useNavigate()
  const handleOnclick = () => {
    navigate("/login")
  }
  return (
    <button onClick={handleOnclick}>
      <h5 className="text-red uppercase">exit</h5>
    </button>
  )
}

const AdminNavbar = () => {
  return (
    <div className="top-13 fixed z-[99] flex h-[46px] w-screen items-center overflow-hidden border bg-white">
      <div className="flex pt-[13px] md:gap-4 md:pl-28 ">
        <WrappedTab mobileCompatiability={false} to="/admin/members">
          members
        </WrappedTab>
        <WrappedTab mobileCompatiability={false} to="/admin/bookings">
          bookings
        </WrappedTab>
        <WrappedTab mobileCompatiability={false} to="/admin/payments">
          payments
        </WrappedTab>
      </div>
      <div className="right-0 md:absolute md:pr-28">
        <Exit />
      </div>
    </div>
  )
}

export default AdminNavbar

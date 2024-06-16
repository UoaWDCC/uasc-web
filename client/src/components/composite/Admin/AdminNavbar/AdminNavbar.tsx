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
    <div
      className="top-13 fixed  z-[99] flex h-[46px] w-screen 
      items-center overflow-hidden border bg-white"
    >
      <span className="relative flex w-full items-center px-4">
        <div className="flex gap-4 pt-[13px]">
          <WrappedTab mobileCompatiability={false} to="/admin/members">
            members
          </WrappedTab>
          <WrappedTab mobileCompatiability={false} to="/admin/bookings">
            bookings
          </WrappedTab>
          <WrappedTab mobileCompatiability={false} to="/admin/availability">
            availability
          </WrappedTab>
        </div>
        <div className="ml-auto pr-4">
          <Exit />
        </div>
      </span>
    </div>
  )
}

export default AdminNavbar

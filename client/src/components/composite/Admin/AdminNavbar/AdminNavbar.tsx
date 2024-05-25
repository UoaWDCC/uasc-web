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
      <div className="flex gap-4 pl-28 pt-[13px] ">
        <WrappedTab to="/admin/members">members</WrappedTab>
        <WrappedTab to="/admin/bookings">bookings</WrappedTab>
        <WrappedTab to="/admin/payments">payments</WrappedTab>
      </div>
      <div className="absolute right-0 pr-28">
        <Exit />
      </div>
    </div>
  )
}

export default AdminNavbar

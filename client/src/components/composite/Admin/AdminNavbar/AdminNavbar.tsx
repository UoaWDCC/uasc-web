import { useRouter } from "next/navigation"
import { WrappedTab } from "../../Navbar/utils/WrappedTab"

const Exit = () => {
  const router = useRouter()

  const handleOnclick = () => {
    router.push("/login")
  }
  return (
    <button type="button" onClick={handleOnclick}>
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
      <span className="relative flex w-full items-center px-4 md:pl-28">
        <div className="flex gap-4 pt-[13px]">
          <WrappedTab mobileCompatiability={false} to="/admin/members">
            members
          </WrappedTab>
          <WrappedTab mobileCompatiability={false} to="/admin/bookings">
            bookings
          </WrappedTab>
          <WrappedTab mobileCompatiability={false} to="/admin/events">
            events
          </WrappedTab>
          <WrappedTab mobileCompatiability={false} to="/admin/availability">
            availability
          </WrappedTab>
          <WrappedTab mobileCompatiability={false} to="/admin/booking-history">
            history
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

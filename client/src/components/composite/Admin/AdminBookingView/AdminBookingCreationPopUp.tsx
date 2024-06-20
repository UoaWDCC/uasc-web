import AdminSearchBar from "../AdminMemberView/AdminSearchBar"
import { CombinedUserData } from "models/User"
import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"

interface IAdminBookingCreationPopUp {
  bookingCreationHandler?: () => void
  /**
   * Callback for when a 'close' event is triggered with the modal open
   */
  handleClose?: () => void
  users?: CombinedUserData[]
}

const Divider = () => {
  return <div className="bg-gray-3 h-8"></div>
}

const AdminBookingCreationPopUp = ({
  handleClose
}: IAdminBookingCreationPopUp) => {
  return (
    <div className="grid grid-cols-2">
      <div className="space-between flex flex-col">
        <p className="opacity-20 ">Select user</p>
        <AdminSearchBar />
        <p className="mt-8">Creating booking for:</p>
      </div>
      <div className="flex flex-col">
        <div className="max-w-[380px]">
          <Calendar />
          <Button>Add New Booking</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingCreationPopUp

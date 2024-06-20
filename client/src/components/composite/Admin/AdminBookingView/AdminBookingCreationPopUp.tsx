import AdminSearchBar from "../AdminMemberView/AdminSearchBar"
import { CombinedUserData } from "models/User"
import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import DateRangePicker from "components/generic/DateRangePicker/DateRangePicker"

interface IAdminBookingCreationPopUp {
  bookingCreationHandler?: () => void
  /**
   * Callback for when a 'close' event is triggered with the modal open
   */
  handleClose?: () => void
  users?: CombinedUserData[]
}

const Divider = () => {
  return <div className="bg-gray-3 ml-auto flex h-screen w-[1px]"></div>
}

const AdminBookingCreationPopUp = ({
  handleClose
}: IAdminBookingCreationPopUp) => {
  return (
    <div className="flex max-w-[800px] gap-7">
      <div className="flex basis-1/2">
        <div className="flex w-full flex-col">
          <p className="opacity-20 ">Select user</p>
          <AdminSearchBar />

          <p className="mt-8">Creating booking for:</p>
        </div>
      </div>
      <Divider />
      <div className="flex basis-1/2">
        <div className="max-w-[380px]">
          <Calendar />
          <DateRangePicker />
          <Button>Add New Booking</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingCreationPopUp

import AdminBookingCreationPopUp from "./AdminBookingCreationPopUp"
import { useAvailableBookingsQuery } from "@/services/Booking/BookingQueries"
import { useAddUserToBookingMutation } from "@/services/Admin/AdminMutations"
import useAllUsers from "@/hooks/useAllUsers"

interface IWrappedAdminBookingCreationPopUp {
  handleClose: () => void
}

const WrappedAdminBookingCreationPopUp = ({
  handleClose
}: IWrappedAdminBookingCreationPopUp) => {
  const { data: bookingSlots } = useAvailableBookingsQuery()

  const { mutateAsync: handleAddUserToBooking, isPending } =
    useAddUserToBookingMutation()

  const { users, stillLoadingUsers } = useAllUsers()

  return (
    <span className="absolute top-14 max-h-fit">
      <AdminBookingCreationPopUp
        users={users}
        bookingSlots={bookingSlots}
        handleClose={handleClose}
        isPending={isPending}
        isLoading={stillLoadingUsers}
        bookingCreationHandler={async (startDate, endDate, uid) => {
          await handleAddUserToBooking({ startDate, endDate, userId: uid })
        }}
      />
    </span>
  )
}

export default WrappedAdminBookingCreationPopUp

import { useUsersQuery } from "@/services/Admin/AdminQueries"
import AdminBookingCreationPopUp from "./AdminBookingCreationPopUp"
import { useEffect, useMemo } from "react"
import { useAvailableBookingsQuery } from "@/services/Booking/BookingQueries"
import { useAddUserToBookingMutation } from "@/services/Admin/AdminMutations"

interface IWrappedAdminBookingCreationPopUp {
  handleClose: () => void
}

const WrappedAdminBookingCreationPopUp = ({
  handleClose
}: IWrappedAdminBookingCreationPopUp) => {
  const {
    data: userPages,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useUsersQuery()

  const { data: bookingSlots } = useAvailableBookingsQuery()

  const { mutateAsync: handleAddUserToBooking, isPending } =
    useAddUserToBookingMutation()

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetchingNextPage, hasNextPage])

  const users = useMemo(
    () => userPages?.pages.flatMap((page) => page.data || []),
    [userPages]
  )

  return (
    <span className="absolute top-14 max-h-fit">
      <AdminBookingCreationPopUp
        users={users}
        bookingSlots={bookingSlots}
        handleClose={handleClose}
        isPending={isPending}
        isLoading={hasNextPage}
        bookingCreationHandler={async (startDate, endDate, uid) => {
          await handleAddUserToBooking({ startDate, endDate, userId: uid })
        }}
      />
    </span>
  )
}

export default WrappedAdminBookingCreationPopUp

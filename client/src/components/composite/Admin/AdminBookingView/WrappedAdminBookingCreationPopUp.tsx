import { useUsersQuery } from "services/Admin/AdminQueries"
import AdminBookingCreationPopUp from "./AdminBookingCreationPopUp"
import { useEffect, useMemo } from "react"
import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"

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
      />
    </span>
  )
}

export default WrappedAdminBookingCreationPopUp

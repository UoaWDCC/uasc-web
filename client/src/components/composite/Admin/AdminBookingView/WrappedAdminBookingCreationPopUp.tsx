import { useUsersQuery } from "services/Admin/AdminQueries"
import AdminBookingCreationPopUp from "./AdminBookingCreationPopUp"
import { useEffect, useMemo } from "react"

interface IWrappedAdminBookingCreationPopUp {
  handleClose: () => void
}

const WrappedAdminBookingCreationPopUp = ({
  handleClose
}: IWrappedAdminBookingCreationPopUp) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useUsersQuery()

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetchingNextPage, hasNextPage])

  const users = useMemo(
    () => data?.pages.flatMap((page) => page.data || []),
    [data]
  )

  return (
    <span className="absolute top-14 max-h-fit">
      <AdminBookingCreationPopUp users={users} handleClose={handleClose} />
    </span>
  )
}

export default WrappedAdminBookingCreationPopUp

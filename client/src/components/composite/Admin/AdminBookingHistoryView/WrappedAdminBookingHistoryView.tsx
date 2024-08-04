import { useBookingHistoryQuery } from "@/services/Admin/AdminQueries"
import AdminBookingHistoryView from "./AdminBookingHistoryView"
import { useCallback, useMemo } from "react"
import useAllUsers from "@/hooks/useAllUsers"

/**
 * To be used for consumption of {@link AdminBookingHistoryView}
 */
const WrappedAdminBookingHistoryView = () => {
  const {
    data: bookingHistoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useBookingHistoryQuery()

  const historyItems = useMemo(() => {
    const history = bookingHistoryData?.pages.flatMap(
      (page) => page.historyEvents || []
    )
    return history?.reverse()
  }, [bookingHistoryData])

  const loadMoreHistory = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const { users } = useAllUsers()

  return (
    <>
      <AdminBookingHistoryView
        historyItems={historyItems}
        users={users}
        loadMore={loadMoreHistory}
      />
    </>
  )
}

export default WrappedAdminBookingHistoryView

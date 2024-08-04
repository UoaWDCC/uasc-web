import { BookingHistoryEvent } from "@/models/History"
import AdminBookingHistoryItem from "./AdminBookingHistoryItem"
import { CombinedUserData } from "@/models/User"
import { useMemo } from "react"
import Button from "@/components/generic/FigmaButtons/FigmaButton"

interface IAdminBookingHistoryView {
  /**
   * The list of history items to display
   */
  historyItems?: BookingHistoryEvent[]

  /**
   * The list of all users for querying names and emails
   */
  users?: CombinedUserData[]

  /**
   * If not all history items have been loaded
   */
  hasMore?: boolean

  /**
   * callback to fetch more history items (if there *is* more)
   */
  loadMore?: () => void
}

/**
 * @deprecated do not use directly, use {@link WrappedAdminBookingHistoryView} instead
 */
const AdminBookingHistoryView = ({
  historyItems = [],
  users = [],
  hasMore,
  loadMore
}: IAdminBookingHistoryView) => {
  const content = useMemo(() => {
    return (
      <>
        {historyItems.map((item) => {
          let matchingUser
          if (
            item.event_type === "added_user_to_booking" ||
            item.event_type === "removed_user_from_booking"
          ) {
            matchingUser = users.find((user) => user.uid === item.uid)
          }
          return (
            <AdminBookingHistoryItem
              item={item}
              key={item.timestamp.seconds}
              name={`${matchingUser?.first_name} ${matchingUser?.last_name}`}
              email={matchingUser?.email}
            />
          )
        })}
      </>
    )
  }, [historyItems, users])

  return (
    <div className="flex w-full flex-col gap-2 py-4">
      <h5 className="font-bold uppercase">Newest</h5>
      {content}
      <h5 className="font-bold uppercase">Oldest</h5>
      <Button disabled={!hasMore || !loadMore}>Load More</Button>
    </div>
  )
}

export default AdminBookingHistoryView

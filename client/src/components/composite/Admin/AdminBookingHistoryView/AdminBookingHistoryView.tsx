import { BookingHistoryEvent } from "@/models/History"
import AdminBookingHistoryItem from "./AdminBookingHistoryItem"
import { CombinedUserData } from "@/models/User"
import { useMemo } from "react"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { useAddUserToBookingMutation } from "@/services/Admin/AdminMutations"
import { Timestamp } from "firebase/firestore"
import { DateUtils } from "@/components/utils/DateUtils"
import Messages from "@/services/Utils/Messages"

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
  const { mutateAsync: addUserToBooking } = useAddUserToBookingMutation()

  const content = useMemo(() => {
    return (
      <>
        {historyItems.map((item) => {
          let matchingUser: CombinedUserData | undefined
          if (
            item.event_type === "added_user_to_booking" ||
            item.event_type === "removed_user_from_booking"
          ) {
            matchingUser = users.find((user) => user.uid === item.uid)
          }

          /**
           * Add more cases as required to implement additional undo handlers
           */
          let undoHandler
          switch (item.event_type) {
            case "removed_user_from_booking": {
              const startDate = Timestamp.fromMillis(
                DateUtils.timestampMilliseconds(item.start_date)
              )
              const endDate = Timestamp.fromMillis(
                DateUtils.timestampMilliseconds(item.end_date)
              )
              undoHandler = async () => {
                if (
                  confirm(
                    Messages.addUserToBooking(
                      matchingUser?.first_name,
                      matchingUser?.last_name,
                      startDate.toDate().toDateString(),
                      endDate.toDate().toDateString()
                    )
                  )
                )
                  await addUserToBooking({
                    startDate,
                    endDate,
                    userId: item.uid
                  })
              }
              break
            }
            default:
          }

          return (
            <AdminBookingHistoryItem
              item={item}
              key={item.timestamp.seconds}
              name={`${matchingUser?.first_name} ${matchingUser?.last_name}`}
              email={matchingUser?.email}
              undoHandler={undoHandler}
            />
          )
        })}
      </>
    )
  }, [historyItems, users, addUserToBooking])

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

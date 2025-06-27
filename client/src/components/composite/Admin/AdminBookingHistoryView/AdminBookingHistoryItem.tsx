import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { DateUtils } from "@/components/utils/DateUtils"
import type { BookingHistoryEvent } from "@/models/History"
import { useMemo } from "react"

interface IAdminBookingHistoryItem {
  /**
   * The event that is to be parsed and displayed in list view
   */
  item: BookingHistoryEvent
  /**
   * The name of the user associated with the event (**NOT** the admin performing it)
   */
  name?: string
  /**
   * The email of the user associated with the event (**NOT** the admin performing it)
   */
  email?: string

  /**
   * Callback to use after clicking the undo button. No parsing of the event type will be done
   * for the handler - it should be predetermined.
   */
  undoHandler?: () => void
}

const AdminBookingHistoryItem = ({
  item,
  name,
  email,
  undoHandler
}: IAdminBookingHistoryItem) => {
  /**
   * Used for parsing the history event and presenting it
   */
  const InnerContent = useMemo(() => {
    const UserInformation = () => {
      return (
        <h5 className="border-dark-blue-100 w-fit border-2 px-3">
          User: <strong>{name}</strong> | Email: <strong>{email}</strong>
        </h5>
      )
    }
    const SharedContent = () => {
      return (
        <>
          <p>
            At{" "}
            <strong>
              {new Date(
                DateUtils.timestampMilliseconds(item.timestamp)
              ).toLocaleString()}
            </strong>{" "}
            for the date range{" "}
            <strong>
              {DateUtils.formattedNzDate(
                new Date(DateUtils.timestampMilliseconds(item.start_date))
              )}
            </strong>{" "}
            to{" "}
            <strong>
              {DateUtils.formattedNzDate(
                new Date(DateUtils.timestampMilliseconds(item.end_date))
              )}
            </strong>
          </p>
        </>
      )
    }
    switch (item.event_type) {
      case "added_user_to_booking":
        return (
          <>
            <h5 className="font-bold uppercase underline">Added to booking</h5>
            <UserInformation />
            <SharedContent />
          </>
        )
      case "removed_user_from_booking":
        return (
          <>
            <h5 className="font-bold uppercase underline">
              Removed from booking
            </h5>
            <UserInformation />
            <SharedContent />
          </>
        )
      case "changed_date_availability":
        return (
          <>
            <h5 className="font-bold uppercase underline">
              Availability Changed
            </h5>
            <div className="flex gap-1">
              <SharedContent />
              <p>
                for <strong>{item.change}</strong> slots
              </p>
            </div>
          </>
        )
    }
  }, [item, name, email])

  return (
    <>
      <div className="border-gray-3 flex w-full flex-col gap-1 rounded-md border bg-white p-4">
        {InnerContent}
        {undoHandler && (
          <Button
            variant="inverted-default-sm"
            className="mt-2"
            onClick={undoHandler}
          >
            Undo
          </Button>
        )}
      </div>
    </>
  )
}

export default AdminBookingHistoryItem

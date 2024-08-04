import { DateUtils } from "@/components/utils/DateUtils"
import { BookingHistoryEvent } from "@/models/History"
import { useMemo } from "react"

interface IAdminBookingHistoryItem {
  item: BookingHistoryEvent
}

const AdminBookingHistoryItem = ({ item }: IAdminBookingHistoryItem) => {
  const InnerContent = useMemo(() => {
    const SharedContent = () => {
      return (
        <>
          <p>{DateUtils.timestampToDate(item.timestamp).toString()}</p>
          <p>
            from{" "}
            {DateUtils.formattedNzDate(
              DateUtils.timestampToDate(item.start_date)
            )}
            to
            {DateUtils.formattedNzDate(
              DateUtils.timestampToDate(item.end_date)
            )}
          </p>
        </>
      )
    }
    switch (item.event_type) {
      case "added_user_to_booking":
        return (
          <div className="flex gap-2">
            <p>Manually added on</p> <SharedContent /> <p>For {item.uid}</p>
          </div>
        )
      case "removed_user_from_booking":
        return (
          <div className="flex gap-2">
            <p>Booking deletion on </p> <SharedContent /> <p>For {item.uid}</p>
          </div>
        )
      case "changed_date_availability":
        return (
          <div className="flex gap-2">
            <p>Availability change on </p> <SharedContent />
            <p>For {item.change} slots</p>
          </div>
        )
    }
  }, [item])

  return (
    <>
      <div className="flex w-full bg-white p-4">{InnerContent}</div>
    </>
  )
}

export default AdminBookingHistoryItem

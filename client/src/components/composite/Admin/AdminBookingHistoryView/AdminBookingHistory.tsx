import { BookingHistoryEvent } from "@/models/History"

interface IAdminBookingHistoryView {
  historyItems?: BookingHistoryEvent[]
}
const AdminBookingHistoryView = ({
  historyItems = []
}: IAdminBookingHistoryView) => {
  return (
    <>
      {historyItems.map((item) => {
        switch (item.event_type) {
          case "added_user_to_booking":
            return <h1>{item.uid}</h1>
          case "removed_user_from_booking":
            return <h1>{item.uid}</h1>
          case "changed_date_availability":
            return <h1>{item.change}</h1>
        }
        return <>error</>
      })}
    </>
  )
}

export default AdminBookingHistoryView

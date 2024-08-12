import AdminBookingDate, {
  IAdminBookingDate
} from "./AdminBookingDate/AdminBookingDate"

export interface IAdminBookingDateDisplay {
  /**
   * The list of dates to be displayed to user
   */
  dates: IAdminBookingDate[]

  /**
   * Callback to remove the booking with specified `id` from a booking date
   */
  handleDelete?: (id: string) => void
}

const AdminBookingDateDisplay = ({ dates }: IAdminBookingDateDisplay) => {
  return (
    <div className="flex gap-2">
      {dates.map((date) => {
        return (
          <span key={date.dateString} className="min-w-[300px]">
            <AdminBookingDate
              dateString={date.dateString}
              dayName={date.dayName}
              handleUserDelete={date.handleUserDelete}
              users={date.users}
            />
          </span>
        )
      })}
    </div>
  )
}

export default AdminBookingDateDisplay

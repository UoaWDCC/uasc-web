import AdminBookingDate, {
  IAdminBookingDate
} from "./AdminBookingDate/AdminBookingDate"

export interface IAdminBookingDateDisplay {
  /**
   * The list of dates to be displayed to user, of type {@link IAdminBookingDate}
   */
  dates: IAdminBookingDate[]

  /**
   * Callback to remove the booking with specified **booking** `id` from a booking date
   */
  handleDelete?: (bookingId: string) => void
}

/**
 * Component for handling the rendering of multiple {@link AdminBookingDate} components
 */
const AdminBookingDateDisplay = ({ dates }: IAdminBookingDateDisplay) => {
  return (
    <div className="flex gap-2">
      {dates.map((date) => {
        return (
          <span key={date.dateString} className="min-w-[340px]">
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

import type { CombinedUserData } from "@/models/User"
import BookingUserCard from "./BookingUserCard"

export type BookingInfo = CombinedUserData & { bookingId: string }

export interface IAdminBookingDate {
  /**
   * The `unique` string representing the date the users are booked for
   */
  dateString: string

  /**
   * For more detailed explaination of the date
   *
   * @example "Friday"
   */
  dayName?: string

  /**
   * All of the user information associated with the date
   *
   * Refer to the utility type {@link BookingInfo}
   */
  users: Readonly<BookingInfo>[]

  /**
   * Callback for when an attempt is made to delete a booking
   */
  handleUserDelete: (id: string) => void
}

/**
 * Used so the first user doesn't display as #1
 */
const INDEX_OFFSET = 1 as const

/**
 * Component to display the available users for each date in a booking
 */
const AdminBookingDate = ({
  dateString,
  dayName,
  users,
  handleUserDelete
}: IAdminBookingDate) => {
  return (
    <div className="border-gray-3 flex h-fit w-full flex-col gap-2 border bg-white p-2">
      {dayName && <h5 className="font-bold uppercase underline">{dayName}</h5>}
      <h2 className="text-dark-blue-100 italic">{dateString}</h2>
      <h5 className="font-bold uppercase">{users.length} Bookings</h5>
      <h5 className="uppercase opacity-75">
        Tap on user to toggle information
      </h5>
      {users.map((user, index) => {
        return (
          <BookingUserCard
            user={user}
            index={index + INDEX_OFFSET} // Do not want the user order to be zero-indexed
            key={user.uid}
            handleDelete={handleUserDelete}
          />
        )
      })}
    </div>
  )
}

export default AdminBookingDate

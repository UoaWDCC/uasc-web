import { useState } from "react"
import { BookingInfo } from "./AdminBookingDate"

interface IBookingUserCard {
  /**
   * The order of the user on the list, preferabally enumerated from a 1-index sequence
   */
  index: number
  /**
   * User with the fields specified by utility type {@link BookingInfo}
   */
  user: Readonly<BookingInfo>

  /**
   * Callback when the delete button for the user's booking is clicked
   *
   * @param bookingId the associated **Booking** id for the user
   */
  handleDelete?: (bookingId: string) => void
}

const BookingUserCard = ({ index, user, handleDelete }: IBookingUserCard) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const hasDietaryRequirements = user.dietary_requirements.trim().length > 0
  return (
    <div
      key={user.uid}
      className="border-gray-3 w-full border bg-white px-4 py-2"
    >
      <div
        className="flex w-full cursor-pointer items-center gap-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-2">
          <span className="flex flex-col">
            <p className="underline">
              <strong>{`#${index}`}</strong> {user.first_name} {user.last_name}
            </p>
            <h5>{user.membership}</h5>
          </span>
          {hasDietaryRequirements && (
            <div className="border-dark-blue-100 flex w-full flex-col rounded-sm border px-2">
              <h5 className="font-bold uppercase">Dietary Reqs</h5>
              <p>{user.dietary_requirements}</p>
            </div>
          )}
        </div>
        <h5
          className="text-red ml-auto cursor-pointer font-bold"
          onClick={() => handleDelete?.(user.bookingId)}
        >
          X
        </h5>
      </div>
      {isOpen && (
        <div className="flex flex-col">
          <div className="mb-2 mt-4 w-full border" />
          <h5>
            <strong>Email:</strong> {user.email}
          </h5>
          <h5>
            <strong>Phone Number:</strong> {user.phone_number}
          </h5>
          <h5>
            <strong>Emergency Contact:</strong> {user.emergency_contact}
          </h5>
        </div>
      )}
    </div>
  )
}

export default BookingUserCard

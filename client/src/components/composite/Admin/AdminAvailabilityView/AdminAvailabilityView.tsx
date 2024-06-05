import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { BookingAvailability } from "models/Booking"
import { useContext } from "react"
import { DateSelectionContext } from "./DateSelectionContext"

interface IAdminAvailabilityView {
  slots?: BookingAvailability[]
  handleMakeAvailable: () => void
  handleMakeUnavailable: () => void
}

const AdminAvailabilityView = ({
  slots = [],
  handleMakeAvailable,
  handleMakeUnavailable
}: IAdminAvailabilityView) => {
  const {
    handleSelectedDateChange,
    selectedDates: { startDate, endDate },
    isUpdating
  } = useContext(DateSelectionContext)
  return (
    <div className="flex h-full w-full gap-2 bg-white p-8">
      <div className="flex flex-col gap-2">
        <span className="max-w-[380px]">
          <Calendar
            minDate={new Date(new Date().toDateString())}
            selectRange
            value={
              startDate && endDate
                ? [
                    new Date(startDate.seconds * 1000),
                    new Date(endDate.seconds * 1000)
                  ]
                : undefined
            }
            tileContent={({ date }) =>
              slots.some(
                (slot) =>
                  new Date(slot.date.seconds * 1000).toDateString() ===
                    date.toDateString() && slot.maxBookings > 0
              ) ? (
                <p>Open</p>
              ) : null
            }
            onChange={(value) => {
              const range = value as [Date, Date]
              handleSelectedDateChange?.(range[0], range[1])
            }}
          />
        </span>

        <span className="flex gap-1">
          <Button variant="default-sm" onClick={handleMakeAvailable}>
            Set Available
          </Button>
          <Button variant="inverted-default-sm" onClick={handleMakeUnavailable}>
            Set Unavailable
          </Button>
        </span>

        {isUpdating && <h5>Updating...</h5>}
      </div>
    </div>
  )
}

export default AdminAvailabilityView

import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { BookingAvailability } from "models/Booking"
import { useContext } from "react"
import { DateSelectionContext } from "./DateSelectionContext"
import Table from "components/generic/ReusableTable/Table"

interface IAdminAvailabilityView {
  slots?: BookingAvailability[]
  /**
   * The mutation function for making the selected date(s) available
   */
  handleMakeAvailable: () => void
  /**
   * The mutation function for making the selected date(s) unavailable
   */
  handleMakeUnavailable: () => void
}

type CondensedBookingInfoColumn = {
  /**
   * Will not be displayed on the table, however important if you want to
   * implement operations on the rows
   */
  uid: string
  /**
   * Any formatted date string is fine
   */
  Date: string
  /**
   * Generally should be a number converted to string
   */
  "Max Bookings": string
  /**
   * Generally should be a number converted to string
   */
  "Available Spaces": string
}
const CONDENSED_BOOKING_INFO_DEFAULT_DATA = {
  uid: "",
  Date: "",
  "Max Bookings": "",
  "Available Spaces": ""
}

/**
 * Slots must be in the format described by @type CondensedBookingInfoColumn
 * This must be wrapped in a `DateSelectionProvider`
 */
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

  const tableData: CondensedBookingInfoColumn[] =
    startDate && endDate
      ? slots
          .filter(
            (slot) =>
              slot.date.seconds >= startDate.seconds &&
              slot.date.seconds <= endDate.seconds
          )
          .map((slot) => {
            return {
              uid: slot.id,
              Date: new Date(slot.date.seconds * 1000).toDateString(),
              "Max Bookings": slot.maxBookings.toString(),
              "Available Spaces": slot.availableSpaces.toString()
            }
          })
      : [CONDENSED_BOOKING_INFO_DEFAULT_DATA]

  return (
    <div
      className="mt-4 flex h-full w-full flex-col items-center
     gap-2 bg-white p-8 md:flex-row md:items-start"
    >
      <div className="flex flex-col gap-2">
        <span className="w-[380px]">
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
              // Find slots that are "available"
              slots.some(
                (slot) =>
                  new Date(slot.date.seconds * 1000).toDateString() ===
                    date.toDateString() && slot.maxBookings > 0
              ) ? (
                // Apply style if it is
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
      <div className="w-full">
        <h3 className="text-dark-blue-100 text-center md:text-left">
          Selected Bookings
        </h3>
        <Table showPerPage={7} data={tableData} />
      </div>
    </div>
  )
}

export default AdminAvailabilityView

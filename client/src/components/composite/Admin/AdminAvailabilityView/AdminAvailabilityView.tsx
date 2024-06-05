import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { BookingAvailability } from "models/Booking"
import { useContext, useState } from "react"
import { DateSelectionContext } from "./DateSelectionContext"
import Table from "components/generic/ReusableTable/Table"
import { Timestamp } from "firebase/firestore"
import TextInput from "components/generic/TextInputComponent/TextInput"
import { DEFAULT_BOOKING_AVAILABILITY } from "services/Admin/AdminService"
import { MS_IN_SECOND } from "utils/Constants"

const MAX_AVAILIBILITY_DEVIATION = 10 as const
const DAYS_IN_WEEK = 7 as const

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

export type CondensedBookingInfoColumn = {
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
 * @deprecated **ONLY** should be imported for tests
 */
export const formatBookingSlotsForAvailabilityView = (
  startDate: Timestamp,
  endDate: Timestamp,
  slots: BookingAvailability[]
) => {
  return slots
    .filter(
      (slot) =>
        slot.date.seconds >= startDate.seconds &&
        slot.date.seconds <= endDate.seconds
    )
    .map((slot) => {
      return {
        uid: slot.id,
        Date: new Date(slot.date.seconds * MS_IN_SECOND).toDateString(),
        "Max Bookings": slot.maxBookings.toString(),
        "Available Spaces": slot.availableSpaces.toString()
      }
    })
}

const formatDateRangeForDialog = (
  startDate?: Timestamp,
  endDate?: Timestamp
) => {
  if (startDate && endDate)
    return `${new Date(startDate.seconds * MS_IN_SECOND).toDateString()} to ${new Date(endDate.seconds * MS_IN_SECOND).toDateString()}`

  return ""
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

  const [availibilityQuantity, setAvailabilityQuantity] = useState<number>(
    DEFAULT_BOOKING_AVAILABILITY
  )

  const dateRangeDefined = startDate && endDate

  const tableData: CondensedBookingInfoColumn[] = dateRangeDefined
    ? formatBookingSlotsForAvailabilityView(startDate, endDate, slots)
    : [CONDENSED_BOOKING_INFO_DEFAULT_DATA]

  const formattedDateRanges = formatDateRangeForDialog(startDate, endDate)

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
              dateRangeDefined
                ? [
                    new Date(startDate.seconds * MS_IN_SECOND),
                    new Date(endDate.seconds * MS_IN_SECOND)
                  ]
                : undefined
            }
            tileContent={({ date }) =>
              // Find slots that are "available"
              slots.some(
                (slot) =>
                  new Date(slot.date.seconds * MS_IN_SECOND).toDateString() ===
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

        <TextInput
          label="Slots to make available"
          value={availibilityQuantity}
          onChange={(e) => {
            setAvailabilityQuantity(e.target.valueAsNumber)
          }}
          max={DEFAULT_BOOKING_AVAILABILITY + MAX_AVAILIBILITY_DEVIATION}
          min={0}
          type="number"
        />
        {availibilityQuantity !== DEFAULT_BOOKING_AVAILABILITY && (
          <>
            <h5 className="text-red">
              Warning: you are not using the default value of{" "}
              {DEFAULT_BOOKING_AVAILABILITY} spots
            </h5>
            <h5
              className="text-dark-blue-100 cursor-pointer font-bold"
              onClick={() => {
                setAvailabilityQuantity(DEFAULT_BOOKING_AVAILABILITY)
              }}
            >
              Reset to {DEFAULT_BOOKING_AVAILABILITY}
            </h5>
          </>
        )}
        <span className="flex gap-1">
          <Button
            variant="default-sm"
            onClick={() => {
              if (!dateRangeDefined) {
                alert("Please select a date range")
                return
              }
              if (
                confirm(
                  `Are you sure you want to make the dates ${formattedDateRanges} available?`
                )
              )
                handleMakeAvailable()
            }}
          >
            Set Available
          </Button>
          <Button
            variant="inverted-default-sm"
            onClick={() => {
              if (!dateRangeDefined) {
                alert("Please select a date range")
                return
              }
              if (
                confirm(
                  `Are you sure you want to make the dates ${formattedDateRanges} unavailable?`
                )
              )
                handleMakeUnavailable()
            }}
          >
            Set Unavailable
          </Button>
        </span>

        {isUpdating && <h5>Updating...</h5>}
      </div>
      <div className="w-full">
        <h3 className="text-dark-blue-100 text-center md:text-left">
          Selected Bookings
        </h3>
        <Table showPerPage={DAYS_IN_WEEK} data={tableData} />
      </div>
    </div>
  )
}

export default AdminAvailabilityView

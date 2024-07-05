import Calendar from "@/components/generic/Calendar/Calendar"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { BookingAvailability } from "models/Booking"
import { useContext } from "react"
import { DateSelectionContext } from "./DateSelectionContext"
import Table from "@/components/generic/ReusableTable/Table"
import { Timestamp } from "firebase/firestore"
import TextInput from "@/components/generic/TextInputComponent/TextInput"
import { DEFAULT_BOOKING_AVAILABILITY } from "@/utils/Constants"
import { DateUtils } from "@/components/utils/DateUtils"
/**
 * Reasonable amount of items to display on table
 */
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
        Date: DateUtils.timestampToDate(slot.date).toDateString(),
        "Max Bookings": slot.maxBookings.toString(),
        "Available Spaces": slot.availableSpaces.toString()
      }
    })
}

/**
 * @param startDate the first date of the range
 * @param endDate the last date of the range
 * @returns a string that describes the date range being booked
 */
const formatDateRangeForDialog = (startDate?: Date, endDate?: Date) => {
  if (startDate && endDate)
    return `${startDate.toDateString()} to ${endDate.toDateString()}` as const

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
    isUpdating,
    slotQty,
    setSlotQty
  } = useContext(DateSelectionContext)

  const dateRangeDefined = startDate && endDate

  const tableData: CondensedBookingInfoColumn[] = dateRangeDefined
    ? formatBookingSlotsForAvailabilityView(
        Timestamp.fromDate(startDate),
        Timestamp.fromDate(endDate),
        slots
      )
    : [CONDENSED_BOOKING_INFO_DEFAULT_DATA]

  const formattedDateRanges = formatDateRangeForDialog(startDate, endDate)

  return (
    <div
      className="mt-4 flex h-full w-full flex-col items-center
     gap-2 bg-white p-8 md:flex-row md:items-start"
    >
      <div className="flex flex-col gap-2">
        <span className="max-w-[380px] sm:w-[380px]">
          <Calendar
            minDate={new Date(Date.now())}
            selectRange
            value={dateRangeDefined ? [startDate, endDate] : undefined}
            tileContent={({ date }) => {
              const slot = slots.find(
                // Find slots that are "available"
                (slot) =>
                  DateUtils.dateEqualToTimestamp(
                    DateUtils.convertLocalDateToUTCDate(date),
                    slot.date
                  )
              )
              return slot ? (
                // Apply style if it is
                <p className="">
                  {slot.availableSpaces}/{slot.maxBookings}
                </p>
              ) : null
            }}
            onChange={(value) => {
              /**
               * Format: [`startDate`, `endDate`]
               */
              const range = value as [Date, Date]
              handleSelectedDateChange?.(range[0], range[1])
            }}
          />
        </span>

        <h5 className="uppercase">Slots to make available</h5>
        <TextInput
          value={slotQty}
          onChange={(e) => {
            setSlotQty?.(e.target.valueAsNumber)
          }}
          max={DEFAULT_BOOKING_AVAILABILITY}
          min={0}
          type="number"
        />
        {slotQty !== DEFAULT_BOOKING_AVAILABILITY && (
          <>
            <h5 className="text-red">
              Warning: you are not using the default value of{" "}
              {DEFAULT_BOOKING_AVAILABILITY} spots
            </h5>
            <h5
              className="text-dark-blue-100 cursor-pointer font-bold"
              onClick={() => {
                setSlotQty?.(DEFAULT_BOOKING_AVAILABILITY)
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
                  `Are you sure you want to make the dates ${formattedDateRanges} available, with ${slotQty} for each date?`
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

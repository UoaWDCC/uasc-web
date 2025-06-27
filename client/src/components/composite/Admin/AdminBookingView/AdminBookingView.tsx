import Button from "@/components/generic/FigmaButtons/FigmaButton"
import CalenderIcon from "@/assets/icons/calender.svg"
import Calendar from "@/components/generic/Calendar/Calendar"
import type { TableRowOperation } from "@/components/generic/ReusableTable/TableUtils"
import { useState, useRef, useMemo } from "react"
import { useClickOutside } from "@/components/utils/Utils"
import ModalContainer from "@/components/generic/ModalContainer/ModalContainer"
import WrappedAdminBookingCreationPopUp from "./WrappedAdminBookingCreationPopUp"
import AdminBookingDateDisplay from "./AdminBookingDateDisplay/AdminBookingDateDisplay"
import type { IAdminBookingDate } from "./AdminBookingDateDisplay/AdminBookingDate/AdminBookingDate"

/**
 * The format of the columns in the admin booking view.
 */
export type BookingMemberColumnFormat = {
  /**
   * The user id, used for adding handlers for each individual table row.
   */
  uid: string
  Date?: string
  Name?: string
  Number?: string
  Emergency?: string
  Email?: string
  "Dietary Requirement"?: string
  Membership?: string
}

interface IAdminBookingView {
  /**
   * Note that the order of the keys in the first element of the array is the order it'll be displayed in the table.
   *
   * @example // {Name: "Jon", Phone: "111"} will display `Name` before `Phone`
   */
  data?: IAdminBookingDate[]

  /**
   *
   * Note that the admin member view will *always* have the multiple operations menu
   *
   * @example
   * ```tsx
   * [
   * {name: "delete user", handler: (uid:string) => {delete(uid)}}
   * // add more if needed
   * ]
   * ```
   */
  rowOperation?: [TableRowOperation]

  /**
   * used to fetch the data once the last page of the table has been reached
   */
  fetchNextPage?: () => void

  /**
   * The range of dates to display the bookings for
   */
  dateRange: { startDate: Date; endDate: Date }

  /**
   * Handler when a new date range is selected on the calendar
   */
  handleDateRangeChange?: (startDate: Date, endDate: Date) => void

  /**
   * Whether or not to display a loading indicator (i.e when fetching a new date range)
   */
  isUpdating?: boolean
}

/**
 * Should be updated with an "empty" default value so the table displays
 * the headers even if the list of data is empty
 */

/**
 * @deprecated not for direct use on any pages, use `WrappedAdminBookingView` instead
 */
export const AdminBookingView = ({
  data = [],
  dateRange,
  handleDateRangeChange,
  isUpdating
}: IAdminBookingView) => {
  // Have state for if the calendar is displayed or not
  const [displayedCalendar, setDisplayedCalendar] = useState<boolean>(false)

  const [openAddBookingPopup, setOpenAddBookingPopup] = useState<boolean>(false)

  // Expensive computation to find how many users total are booked in for the rang
  const totalBookingsForRange = useMemo(
    () => data.flatMap((date) => date.users).length,
    [data]
  )

  // Add handler for when the Pick Date button is clicked
  const onClickHandler = () => {
    setDisplayedCalendar(!displayedCalendar)
  }
  // Close on click outside
  const calendarRef = useRef<HTMLDivElement>(null)
  useClickOutside(calendarRef, () => setDisplayedCalendar(false))

  return (
    <>
      <div
        className={`flex w-full flex-col ${isUpdating ? "brightness-75" : "brightness-100"}`}
      >
        <span className="my-4 flex w-full flex-col items-center justify-center sm:flex-row">
          <h2 className="text-dark-blue-100 italic">Bookings</h2>
          <div className="sm:ml-auto">
            <Button
              variant="default-sm"
              onClick={() => setOpenAddBookingPopup(true)}
            >
              Add New booking
            </Button>
          </div>
        </span>
        <span className="border-gray-3 flex h-fit w-full flex-col items-center border bg-white px-2 py-1 sm:flex-row">
          <h4 className="text-dark-blue-100">
            {dateRange.startDate.toDateString()} -{" "}
            {dateRange.endDate.toDateString()} (
            <strong>{totalBookingsForRange}</strong> Bookings)
          </h4>
          <span className="relative z-50 flex max-h-[40px] sm:ml-auto">
            {displayedCalendar ? (
              <span
                ref={calendarRef}
                // Be careful when changing this - is essential to ensuring the calendar displays properly on smaller AND larger screens
                className="absolute left-1/2 w-[350px] -translate-x-1/2 sm:left-auto sm:right-0 sm:top-0  sm:translate-x-0 "
              >
                <Calendar
                  value={[dateRange.startDate, dateRange.endDate]}
                  onChange={(range) => {
                    const [start, end] = range as [Date, Date]
                    handleDateRangeChange?.(start, end)
                    setDisplayedCalendar(false)
                  }}
                  selectRange
                />
              </span>
            ) : null}
            <Button variant="inverted-default-st" onClick={onClickHandler}>
              <span className="flex items-center justify-center gap-2 ">
                pick date{" "}
                <span className="h-[22px] w-[22px] ">
                  <CalenderIcon className="fill-dark-blue-100 group-hover:fill-white" />
                </span>
              </span>
            </Button>
          </span>
        </span>
        <span className="mt-2 overflow-x-auto">
          <AdminBookingDateDisplay dates={data} />
        </span>
      </div>
      <ModalContainer isOpen={openAddBookingPopup}>
        <WrappedAdminBookingCreationPopUp
          handleClose={() => setOpenAddBookingPopup(false)}
        />
      </ModalContainer>
    </>
  )
}

export default AdminBookingView

import Table from "components/generic/ReusableTable/Table"
import Button from "components/generic/FigmaButtons/FigmaButton"
import CalenderIcon from "assets/icons/calender.svg?react"
import Calendar from "components/generic/Calendar/Calendar"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowOperation
} from "components/generic/ReusableTable/TableUtils"
import { useState, useRef } from "react"
import { useClickOutside, timestampToDate } from "components/utils/Utils"
import { Timestamp } from "firebase/firestore"

export type BookingMemberColumnFormat = {
  /**
   * The user id, used for adding handlers for each individual table row.
   */
  uid: string
  Date?: string
  Name?: string
  Number?: string
  Email?: string
  "Dietary Requirement"?: string
}

interface IAdminBookingView {
  /**
   * Note that the order of the keys in the first element of the array is the order it'll be displayed in the table.
   *
   * @example // {Name: "Jon", Phone: "111"} will display `Name` before `Phone`
   */
  data?: BookingMemberColumnFormat[]

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
  rowOperations?: TableRowOperation[]

  /**
   * used to fetch the data once the last page of the table has been reached
   */
  fetchNextPage?: () => void

  /**
   * The range of dates to display the bookings for
   */
  dateRange: { startDate: Timestamp; endDate: Timestamp }

  /**
   * Handler when a new date range is selected on the calendar
   */
  handleDateRangeChange?: (startDate: Timestamp, endDate: Timestamp) => void
}

const defaultData = {
  [TABLE_ROW_IDENTIFIER_KEY]: "",
  Date: "",
  Name: "",
  Number: "",
  Email: "",
  "Dietary Requirement": ""
}

export const AdminBookingView = ({
  data,
  rowOperations,
  dateRange,
  handleDateRangeChange
}: IAdminBookingView) => {
  // Have state for if the calendar is displayed or not
  const [displayedCalendar, setDisplayedCalendar] = useState<boolean>(false)

  // Add handler for when the Pick Date button is clicked
  const onClickHandler = () => {
    setDisplayedCalendar(!displayedCalendar)
  }
  // Close on click outside
  const calendarRef = useRef<HTMLDivElement>(null)
  useClickOutside(calendarRef, () => setDisplayedCalendar(false))

  return (
    <>
      <div className="flex w-full flex-col">
        <span className="my-4 flex w-full flex-col items-center justify-center sm:flex-row">
          <h2 className="text-dark-blue-100 ">Bookings</h2>
          <div className="sm:ml-auto">
            <Button variant="default-sm">Add New booking</Button>
          </div>
        </span>
        <span className="border-gray-3 flex h-fit w-full flex-col items-center border bg-white px-2 py-1 sm:flex-row">
          <h4 className="text-dark-blue-100">
            {timestampToDate(dateRange.startDate).toDateString()} -{" "}
            {timestampToDate(dateRange.endDate).toDateString()}
          </h4>
          <span className="relative z-50 flex max-h-[40px] sm:ml-auto">
            {displayedCalendar ? (
              <span
                ref={calendarRef}
                // Be careful when changing this - is essential to ensuring the calendar displays properly on smaller AND larger screens
                className="absolute left-1/2 max-w-[350px] -translate-x-1/2 sm:left-auto sm:right-0 sm:top-0  sm:translate-x-0 "
              >
                <Calendar
                  value={[
                    timestampToDate(dateRange.startDate),
                    timestampToDate(dateRange.endDate)
                  ]}
                  onChange={(range) => {
                    const [start, end] = range as [Date, Date]
                    handleDateRangeChange?.(
                      Timestamp.fromDate(start),
                      Timestamp.fromDate(end)
                    )
                  }}
                  selectRange
                />
              </span>
            ) : null}
            <Button variant="inverted-default-st" onClick={onClickHandler}>
              <span className="flex items-center justify-center gap-2 ">
                pick date
                <span className="h-[22px] w-[22px] ">
                  <CalenderIcon className="fill-dark-blue-100 group-hover:fill-white" />
                </span>
              </span>
            </Button>
          </span>
        </span>
        <Table<BookingMemberColumnFormat, "multiple-operations">
          data={data || [defaultData]}
          operationType="multiple-operations"
          rowOperations={rowOperations}
          // Make sure that this is smaller than the amount we fetch in the `AdminService` for better UX
          showPerPage={15}
        />
      </div>
    </>
  )
}

export default AdminBookingView
import Table from "components/generic/ReusableTable/Table"
import Button from "components/generic/FigmaButtons/FigmaButton"
import CalenderIcon from "assets/icons/calender.svg?react"
import Calendar from "components/generic/Calendar/Calendar"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowOperation
} from "components/generic/ReusableTable/TableUtils"
import { useState, useRef } from "react"
import { useClickOutside } from "components/utils/Utils"

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
   * 
   */

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
  rowOperations
}: IAdminBookingView) => {
  const [dateRange] = useState<{
    startDate: Date
    endDate: Date
  }>({ startDate: new Date(), endDate: new Date() })

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
        <span className="my-4 flex w-full items-center justify-center">
          <h2 className="text-dark-blue-100 ">Booking</h2>
          <div className="ml-auto">
            <Button variant="default-sm">Add New booking</Button>
          </div>
        </span>
        <span className="border-gray-3 flex h-[51px] w-full items-center border bg-white">
          <h4 className="text-dark-blue-100 pl-4">
            {dateRange.startDate.toDateString()} -
            {dateRange.endDate.toDateString()}
          </h4>
          <span className="relative ml-auto flex pr-4">
            {displayedCalendar ? (
              <span
                ref={calendarRef}
                className="absolute right-4 top-0 w-[350px]"
              >
                <Calendar selectRange />
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

import Table from "components/generic/ReusableTable/Table"
import Button from "components/generic/FigmaButtons/FigmaButton"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowOperation
} from "components/generic/ReusableTable/TableUtils"

export type BookingMemberColumnFormat = {
  /**
   * The user id, used for adding handlers for each individual table row.
   */
  uid: string
  Date?: string
  Name?: string
  Number?: string
  Email?: string
  "Dietary Requirement": string
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
  return (
    <>
      <div className="flex">
        <div className="mb-4 mt-8 w-full justify-between">
          <h2>Bookings</h2>
        </div>
        <span className="text-nowrap pt-12">
          <Button variant="default-sm">Add New booking</Button>
        </span>
      </div>

      <Table<BookingMemberColumnFormat, "multiple-operations">
        data={data || [defaultData]}
        operationType="multiple-operations"
        rowOperations={rowOperations}
        // Make sure that this is smaller than the amount we fetch in the `AdminService` for better UX
        showPerPage={15}
      />
    </>
  )
}

export default AdminBookingView

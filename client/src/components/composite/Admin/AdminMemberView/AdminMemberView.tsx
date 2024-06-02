import AdminSearchBar from "./AdminSearchBar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import Table from "components/generic/ReusableTable/Table"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowOperation
} from "components/generic/ReusableTable/TableUtils"
import { useState } from "react"

export type MemberColumnFormat = {
  /**
   * The user id, used for adding handlers for each individual table row.
   */
  uid: string
  Name?: string
  Email?: string
  Status?: string
  "Date Joined"?: string
}

interface IAdminMemberView {
  /**
   * Note that the order of the keys in the first element of the array is the order it'll be displayed in the table.
   *
   * @example // {Name: "Jon", Phone: "111"} will display `Name` before `Phone`
   */
  data?: MemberColumnFormat[]

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
}

/**
 * Used to display columns if there is no data
 */
const defaultData = {
  [TABLE_ROW_IDENTIFIER_KEY]: "",
  Name: "",
  Status: "",
  Email: "",
  "Date Joined": ""
}

export const AdminMemberView = ({ data, rowOperations }: IAdminMemberView) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("")
  const dataFilter = (oldData: MemberColumnFormat[]) =>
    currentSearchQuery.length > 2
      ? oldData.filter(
          (item) =>
            item.Email?.toLowerCase().includes(currentSearchQuery) ||
            item.Name?.toLowerCase().includes(currentSearchQuery)
        )
      : oldData
  const onSeachQueryChangedHandler = (newQuery: string) => {
    setCurrentSearchQuery(newQuery)
  }
  return (
    <>
      <span className="mb-4 mt-6 flex w-full justify-between">
        <span className="flex gap-5">
          <AdminSearchBar onQueryChanged={onSeachQueryChangedHandler} />
          <Button variant="inverted-default-sm">Filter</Button>
        </span>
        <Button variant="default-sm">Add New Member</Button>
      </span>
      <Table<MemberColumnFormat, "multiple-operations">
        data={(data && dataFilter(data)) || [defaultData]}
        operationType="multiple-operations"
        rowOperations={rowOperations}
      />
    </>
  )
}

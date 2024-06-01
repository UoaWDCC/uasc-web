import Table, {
  TABLE_ROW_IDENTIFIER_KEY
} from "components/generic/ReusableTable/Table"
import AdminSearchBar from "./AdminSearchBar"
import Button from "components/generic/FigmaButtons/FigmaButton"
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

export const AdminMemberView = ({ data }: IAdminMemberView) => {
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
      <Table data={(data && dataFilter(data)) || [defaultData]} />
    </>
  )
}

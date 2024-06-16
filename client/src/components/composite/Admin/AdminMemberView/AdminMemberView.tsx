import AdminSearchBar from "./AdminSearchBar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import Table from "components/generic/ReusableTable/Table"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowOperation
} from "components/generic/ReusableTable/TableUtils"
import { useEffect, useState } from "react"

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

  /**
   * used to fetch the data once the last page of the table has been reached
   */
  fetchNextPage?: () => void

  /**
   * Called when the *add new member* button is clicked
   */
  openAddMemberView?: () => void
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

const ADMIN_MEMBER_VIEW_MIN_SEARCH_QUERY_LENGTH = 2 as const

export const AdminMemberView = ({
  data,
  rowOperations,
  fetchNextPage,
  openAddMemberView
}: IAdminMemberView) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("")
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const isValidSearchQuery =
    currentSearchQuery.length > ADMIN_MEMBER_VIEW_MIN_SEARCH_QUERY_LENGTH
  const dataFilter = (oldData: MemberColumnFormat[]) =>
    isValidSearchQuery
      ? oldData.filter(
          (item) =>
            item.Email?.toLowerCase().includes(currentSearchQuery) ||
            item.Name?.toLowerCase().includes(currentSearchQuery)
        )
      : oldData

  useEffect(() => {
    if (isLastPage || isValidSearchQuery) {
      fetchNextPage?.()
    }
  }, [isLastPage, fetchNextPage, isValidSearchQuery])

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
        <Button variant="default-sm" onClick={() => openAddMemberView?.()}>
          Add New Member
        </Button>
      </span>
      <Table<MemberColumnFormat, "multiple-operations">
        data={(data && dataFilter(data)) || [defaultData]}
        operationType="multiple-operations"
        rowOperations={rowOperations}
        // Make sure that this is smaller than the amount we fetch in the `AdminService` for better UX
        showPerPage={15}
        onPageChange={(last) => {
          setIsLastPage(last)
        }}
      />
    </>
  )
}

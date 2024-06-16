import { useUsersQuery } from "services/Admin/AdminQueries"
import { AdminMemberView, MemberColumnFormat } from "./AdminMemberView"
import {
  useDemoteUserMutation,
  usePromoteUserMutation
} from "services/Admin/AdminMutations"
import { TableRowOperation } from "components/generic/ReusableTable/TableUtils"

const WrappedAdminMemberView = () => {
  /**
   * Note that the followind queries/mutations should be scoped to only admins only,
   */
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useUsersQuery()

  // Need flatmap because of inner map
  const transformedDataList = data?.pages.flatMap(
    (page) =>
      page.data?.map((data) => {
        const transformedData: MemberColumnFormat = { uid: "" }
        transformedData.uid = data.uid
        transformedData.Name = `${data.first_name} ${data.last_name}`
        transformedData.Email = data.email
        transformedData["Date Joined"] = data.dateJoined
        transformedData.Status = data.membership
        return transformedData
      }) || [] // avoid undefined values in list
  )

  const { mutateAsync: promoteUser } = usePromoteUserMutation()
  const { mutateAsync: demoteUser } = useDemoteUserMutation()

  /**
   * You should optimistically handle the mutations in `AdminMutations`
   */
  const rowOperations: TableRowOperation[] = [
    {
      name: "promote",
      handler: (uid: string) => {
        promoteUser(uid)
      }
    },
    {
      name: "demote",
      handler: (uid: string) => {
        demoteUser(uid)
      }
    },
    {
      name: "delete",
      handler: () => {
        // TODO
        throw new Error("Not Implemented")
      }
    },
    {
      name: "edit",
      handler: () => {
        // TODO
        throw new Error("Not Implemented")
      }
    }
  ]

  return (
    <AdminMemberView
      fetchNextPage={() => {
        !isFetchingNextPage && hasNextPage && fetchNextPage()
      }}
      rowOperations={rowOperations}
      data={transformedDataList}
    />
  )
}

export default WrappedAdminMemberView

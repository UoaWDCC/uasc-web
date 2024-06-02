import { Navigate } from "react-router-dom"
import { useUsersQuery } from "services/Admin/AdminQueries"
import { useAppData } from "store/Store"
import { AdminMemberView, MemberColumnFormat } from "./AdminMemberView"
import {
  useDemoteUserMutation,
  usePromoteUserMutation
} from "services/Admin/AdminMutations"
import { TableRowOperation } from "components/generic/ReusableTable/TableUtils"

const WrappedAdminMemberView = () => {
  const [{ currentUserClaims }] = useAppData()

  if (!currentUserClaims?.admin) {
    return <Navigate to="/" />
  }

  const { data } = useUsersQuery()

  const transformedDataList = data?.map((data) => {
    const transformedData: MemberColumnFormat = { uid: "" }
    transformedData.uid = data.uid
    transformedData.Name = `${data.first_name} ${data.last_name}`
    // TODO: Email
    transformedData.Email = "test@gmail.com (FAKE)"
    // TODO: Date Joined
    transformedData["Date Joined"] = "today (FAKE)"
    // TODO: Membership Status
    transformedData.Status = "Member (FAKE)"
    return transformedData
  })

  const { mutateAsync: promoteUser } = usePromoteUserMutation()
  const { mutateAsync: demoteUser } = useDemoteUserMutation()

  const rowOperations: TableRowOperation[] = [
    {
      name: "promote",
      handler: async (uid: string) => {
        await promoteUser(uid)
      }
    },
    {
      name: "demote",
      handler: async (uid: string) => {
        await demoteUser(uid)
      }
    },
    {
      name: "delete",

      handler: () => {
        // TODO
        throw new Error("Not Implemented")
      }
    }
  ]

  return (
    <AdminMemberView rowOperations={rowOperations} data={transformedDataList} />
  )
}

export default WrappedAdminMemberView

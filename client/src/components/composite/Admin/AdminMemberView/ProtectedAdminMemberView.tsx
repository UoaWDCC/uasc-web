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

  /**
   * Note that the followind queries/mutations should be scoped to only admins only,
   * earlier return is only for UX purposes
   */
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

  const getNameFromUid = (uid: string) => {
    const matchingUser = data?.find((user) => user.uid === uid)
    if (matchingUser) {
      return `${matchingUser.first_name} ${matchingUser.last_name}`
    }
    return "Unknown"
  }

  const rowOperations: TableRowOperation[] = [
    {
      name: "promote",
      handler: (uid: string) => {
        promoteUser(uid, {
          onSuccess: () =>
            alert(`Successfully added membership for ${getNameFromUid(uid)}`),
          onError: () =>
            alert(
              `Could not add membership for ${getNameFromUid(uid)}, they may already have membership`
            )
        })
      }
    },
    {
      name: "demote",
      handler: (uid: string) => {
        demoteUser(uid, {
          onSuccess: () =>
            alert(`Successfully removed membership for ${getNameFromUid(uid)}`),
          onError: () =>
            alert(
              `Could not remove membership for ${getNameFromUid(uid)}, they may already not have membership`
            )
        })
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
    <AdminMemberView rowOperations={rowOperations} data={transformedDataList} />
  )
}

export default WrappedAdminMemberView

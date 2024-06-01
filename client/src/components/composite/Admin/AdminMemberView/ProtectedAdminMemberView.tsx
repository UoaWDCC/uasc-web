import { Navigate } from "react-router-dom"
import { useUsersQuery } from "services/Admin/AdminQueries"
import { useAppData } from "store/Store"
import { AdminMemberView, MemberColumnFormat } from "./AdminMemberView"

const WrappedAdminMemberView = () => {
  const [{ currentUserClaims }] = useAppData()

  if (!currentUserClaims?.admin) {
    return <Navigate to="/" />
  }

  const { data } = useUsersQuery()
  const transformedDataList = data?.map((data) => {
    const transformedData: MemberColumnFormat = {}
    transformedData.Name = `${data.first_name} ${data.last_name}`
    // TODO: Email
    transformedData.Email = "test@gmail.com (FAKE)"
    // TODO: Date Joined
    transformedData["Date Joined"] = "today (FAKE)"
    // TODO: Membership Status
    transformedData.Status = "Member (FAKE)"
    return transformedData
  })
  return <AdminMemberView data={transformedDataList} />
}

export default WrappedAdminMemberView

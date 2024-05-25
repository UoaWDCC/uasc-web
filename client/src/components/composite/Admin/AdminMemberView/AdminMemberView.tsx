import Table from "components/generic/ReusableTable/Table"
import { useUsersQuery } from "services/Admin/AdminQueries"

export type MemberColumnFormat = {
  Name?: string
  Email?: string
  Status?: string
  "Date Joined"?: string
}

interface IAdminMemberView {
  /**
   * Note that the order of the keys in the first element of the array is the order it'll be displayed in the table.
   *
   * @example {Name: "Jon", Phone: "111"} will display `Name` before `Phone`
   */
  data?: MemberColumnFormat[]
}

/**
 * Used to display columns if there is no data
 */
const defaultData = {
  Name: "",
  Status: "",
  Email: "",
  "Date Joined": ""
}

export const AdminMemberView = ({ data }: IAdminMemberView) => {
  return (
    <>
      <Table data={data || [defaultData]} />
    </>
  )
}

export const WrappedAdminMemberView = () => {
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

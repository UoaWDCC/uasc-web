import UserInformation from "components/composite/Profile/UserInformation/UserInformation"
import { PageTitle } from "components/generic/PageTitle/PageTitle"
import { useAppData } from "store/store"

export default function Profile() {
  const [{ currentUserData }] = useAppData()

  return (
    <>
      <PageTitle title="Profile" />
      <div>
        <UserInformation userData={currentUserData} />
      </div>
    </>
  )
}

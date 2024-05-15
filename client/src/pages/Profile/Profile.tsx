import UserInformationSection from "components/composite/Profile/UserInformation/UserInformationSection"
import { PageTitle } from "components/generic/PageTitle/PageTitle"
import { useAppData } from "store/Store"

export default function Profile() {
  const [{ currentUserData }] = useAppData()

  return (
    <>
      <PageTitle title="Profile" />
      <div>
        <UserInformationSection userData={currentUserData} />
      </div>
    </>
  )
}

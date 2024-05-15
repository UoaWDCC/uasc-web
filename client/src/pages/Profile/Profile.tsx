import UserInformationSection from "components/composite/Profile/UserInformation/UserInformationSection"
import { PageTitle } from "components/generic/PageTitle/PageTitle"
import { useAppData } from "store/Store"
import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"

export default function Profile() {
  const [{ currentUserData }] = useAppData()

  return (
    <>
      <PageTitle title="Profile" />
      <div>
        <UserInformationSection userData={currentUserData} />
      </div>
      <ProfileInformationPanel title="w"/>
    </>
  )
}

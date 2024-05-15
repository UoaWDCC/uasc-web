import UserInformationSection from "components/composite/Profile/UserInformation/UserInformationSection"
import { useAppData } from "store/Store"
import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"

export default function Profile() {
  const [{ currentUserData }] = useAppData()

  return (
    <FullPageBackgroundImage>
      <div>
        <h2>Ray Zhao</h2>
        <div>
          <UserInformationSection userData={currentUserData} />
        </div>
        <ProfileInformationPanel title="w" />
      </div>
    </FullPageBackgroundImage>
  )
}

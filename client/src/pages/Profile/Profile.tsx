import { useAppData } from "store/Store"
import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"

const Field = ({
  subtitle,
  description
}: {
  subtitle: string
  description?: string
}) => {
  return (
    <>
      <div>
        <p className="pb-1 text-base font-normal leading-tight text-stone-300">
          {subtitle}
        </p>
        <p className="text-black/opacity-20 pb-1 text-base font-normal leading-tight">
          {description}
        </p>
      </div>
    </>
  )
}
export default function Profile() {
  const [{ currentUserData }] = useAppData()
  const { first_name, last_name } = currentUserData || {
    first_name: "Ray",
    last_name: "Zhao"
  }
  return (
    <FullPageBackgroundImage>
      <h2 className="pr-[77.5%] pb-5 text-dark-blue-100 italic">{`${first_name} ${last_name}`}</h2>
      <div className="grid w-full gap-4">
        <ProfileInformationPanel title="Personal Details" onEdit={() => {}}>
          <Field subtitle="Name" description={`${first_name} ${last_name}`} />
          <Field subtitle="Name" description="value" />
        </ProfileInformationPanel>
        <div className="grid w-full grid-cols-2 gap-4">
          <ProfileInformationPanel title="Membership" />
          <ProfileInformationPanel title="Additional Details" />
        </div>
      </div>
    </FullPageBackgroundImage>
  )
}

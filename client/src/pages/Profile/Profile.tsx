import { useAppData } from "store/Store"
import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import Button from "components/generic/FigmaButtons/FigmaButton"

const ExitButton = () => {
  return (
    <div className="uppercase">
      <Button>exit</Button>
    </div>
  )
}

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
  return (
    <FullPageBackgroundImage>
      <div className="grid-cols grid w-full">
        <div className="flex">
          <h2 className="text-dark-blue-100 left-0 top-0 italic">{`${currentUserData?.first_name} ${currentUserData?.last_name}`}</h2>
          <ExitButton />
        </div>

        <div className="grid w-full gap-4">
          <ProfileInformationPanel title="Personal Details" onEdit={() => {}}>
            <Field
              subtitle="Name"
              description={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
            />
            <Field subtitle="Name" description="value" />
          </ProfileInformationPanel>
          <div className="grid w-full grid-cols-2 gap-4">
            <ProfileInformationPanel title="Membership" />
            <ProfileInformationPanel title="Additional Details" />
          </div>
        </div>
      </div>
    </FullPageBackgroundImage>
  )
}

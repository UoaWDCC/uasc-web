import { useAppData } from "store/Store"
import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"

const ExitButton = () => {
  return (
    <div
      className="border-red space-x-4; disabled:bg-gray-3 text-red hover:bg-red
    flex flex-col items-center rounded-md border bg-white px-8 py-2 font-sans font-bold 
   hover:text-white enabled:border"
    >
      <button className="uppercase">delete profile</button>
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
      <div className="grid-cols grid w-full ">
        <div className="grid grid-cols-5 gap-3">
          <h2 className="text-dark-blue-100 left-0 top-0 col-span-4 grid italic">{`${currentUserData?.first_name} ${currentUserData?.last_name}`}</h2>
          <div className="flex items-center justify-center">
            <ExitButton />
          </div>
        </div>

        <div className="grid w-full gap-4">
          <ProfileInformationPanel title="Personal details" onEdit={() => {}}>
            <Field
              subtitle="Name"
              description={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
            />
            <Field subtitle="Name" description="value" />
          </ProfileInformationPanel>
          <div className="grid w-full grid-cols-2 gap-4">
            <ProfileInformationPanel title="Membership" />
            <ProfileInformationPanel title="Additional details" />
            <ProfileInformationPanel title="Current bookings">
              <div className="border border-black p-4">Calender Component</div>
            </ProfileInformationPanel>
          </div>
        </div>
      </div>
    </FullPageBackgroundImage>
  )
}

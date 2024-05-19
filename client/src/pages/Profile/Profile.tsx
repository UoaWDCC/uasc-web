import { useAppData } from "store/Store"

import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { Footer } from "components/generic/Footer/Footer"

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
  const [{ currentUser }] = useAppData()

  return (
    <FullPageBackgroundImage>
      <div className="grid-cols grid w-full ">
        <div className="grid grid-cols-5 gap-3 pb-4">
          <h2 className="text-dark-blue-100 left-0 top-0 col-span-4 grid italic">{`${currentUserData?.first_name} ${currentUserData?.last_name}`}</h2>
          <div className="flex items-center justify-center pl-24">
            <ExitButton />
          </div>
        </div>

        <div className="grid w-full gap-4">
          <ProfileInformationPanel title="Personal details" onEdit={() => {}}>
            <div className="grid grid-cols-4 gap-80">
              <Field
                subtitle="Name"
                description={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
              />
              <Field
                subtitle="Gender"
                description={`${currentUserData?.gender}`}
              />
              <Field
                subtitle="Student ID"
                description={`${currentUserData?.student_id}`}
              />
              <Field
                subtitle="Date of birth"
                description={`${currentUserData?.date_of_birth}`}
              />
            </div>
            <div className="grid grid-cols-3 gap-[105%] text-nowrap">
              <Field subtitle="Email" description={`${currentUser?.email}`} />
              <Field subtitle="Phone number" description="021 123 1234" />
              <Field
                subtitle="Emergency contact info"
                description={`${currentUserData?.emergency_contact}`}
              />
            </div>
          </ProfileInformationPanel>
          <div className="grid w-full grid-cols-2 gap-4">
            <ProfileInformationPanel title="Membership" onEdit={() => {}}>
              <Field
                subtitle="Membership type"
                description={"UoA Student"} // value not yet set
              />
              <Field
                subtitle="Valid til"
                description="9/12/24" // value not yet set
              />
            </ProfileInformationPanel>
            <ProfileInformationPanel
              title="Additional details"
              onEdit={() => {}}
            >
              <Field
                subtitle="Dietary requirements"
                description={`${currentUserData?.dietary_requirements}`}
              />
              <Field
                subtitle="Skiier/Snowboarder"
                description={`${currentUserData?.does_ski}`}
              />
            </ProfileInformationPanel>
            <ProfileInformationPanel title="Current bookings">
              <div className="border border-black p-4">
                Calender component waiting to be implemented
              </div>
            </ProfileInformationPanel>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </FullPageBackgroundImage>
  )
}

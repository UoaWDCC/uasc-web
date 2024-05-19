import { useAppData } from "store/Store"
import { useNavigate } from "react-router-dom"

import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { Footer } from "components/generic/Footer/Footer"

const SignOutButton = () => {
  const navigate = useNavigate()
  const handleOnclick = () => {
    navigate("/login")
  }
  return (
    <div
      className="border-red space-x-4; disabled:bg-gray-3 text-red hover:bg-red
    flex flex-col items-center rounded-md border bg-white px-8 py-2 font-sans font-bold 
   hover:text-white enabled:border"
    >
      <button className="uppercase" onClick={handleOnclick}>
        sign out
      </button>
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
      <div className="pb-[15%]">
        <div className="grid-cols grid w-full ">
          <div className="grid grid-cols-5 gap-3 pb-4">
            <h2 className="text-dark-blue-100 left-0 top-0 col-span-4 grid pl-4 italic">{`${currentUserData?.first_name} ${currentUserData?.last_name}`}</h2>
            <div className="ml-[200px] flex items-center justify-center text-nowrap">
              <SignOutButton />
            </div>
          </div>

          <div className="grid w-full gap-4">
            <ProfileInformationPanel title="Personal details" onEdit={() => {}}>
              <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-4">
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
                <div className="grid grid-cols-4 text-nowrap">
                  <Field
                    subtitle="Email"
                    description={`${currentUser?.email}`}
                  />
                  <Field subtitle="Phone number" description="021 123 1234" />
                  <Field
                    subtitle="Emergency contact info"
                    description={`${currentUserData?.emergency_contact}`}
                  />
                </div>
              </div>
            </ProfileInformationPanel>
            <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-2">
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
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </FullPageBackgroundImage>
  )
}

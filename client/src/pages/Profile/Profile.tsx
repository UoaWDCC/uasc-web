import { useAppData } from "store/Store"
import { useNavigate } from "react-router-dom"

import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import { Footer } from "components/generic/Footer/Footer"
import ResponsiveBackgroundImage from "components/generic/ResponsiveBackgroundImage/ResponsiveBackground"
import { useForceRefreshToken } from "hooks/useRefreshedToken"
import { timestampToDate } from "components/utils/Utils"
import { useMemo } from "react"

const SignOutButton = () => {
  const navigate = useNavigate()
  const handleOnclick = () => {
    navigate("/login")
  }

  useForceRefreshToken()

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

const determineUserSkiSnowboardStatus = (status: {
  Ski?: boolean | undefined
  Snowboard?: boolean | undefined
}) => {
  if (status.Ski && status.Snowboard) {
    return "Both"
  } else if (status.Ski) {
    return "Skiier"
  } else if (status.Snowboard) {
    return "Snowboarder"
  } else {
    return "New"
  }
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
  const [{ currentUserData, currentUser, currentUserClaims }] = useAppData()

  const userMembership = useMemo(() => {
    if (currentUserClaims?.admin) return "Admin"
    if (currentUserClaims?.member) return "Member"
    return "Guest"
  }, [currentUserClaims])

  return (
    <div className="relative min-h-screen">
      <ResponsiveBackgroundImage>
        <div className="py-8">
          <div className="grid-cols grid w-full ">
            <div className="flex flex-col md:flex-row">
              <h2 className="text-dark-blue-100 left-0 top-0 col-span-4 grid italic">{`${currentUserData?.first_name} ${currentUserData?.last_name}`}</h2>
              <div className="max-w my-2 md:ml-auto">
                <SignOutButton />
              </div>
            </div>

            <div className="grid w-full gap-4">
              <ProfileInformationPanel
                title="Personal details"
                onEdit={() => {}}
              >
                <div className="grid grid-cols-2 gap-x-16 md:grid-cols-4">
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
                    description={
                      currentUserData?.date_of_birth &&
                      `${timestampToDate(currentUserData?.date_of_birth).toLocaleDateString("en-NZ")}`
                    }
                  />
                  <Field
                    subtitle="Email"
                    description={`${currentUser?.email}`}
                  />
                  <Field
                    subtitle="Phone number"
                    description={`${currentUserData?.phone_number}`}
                  />
                  <Field
                    subtitle="Emergency contact info"
                    description={`${currentUserData?.emergency_contact}`}
                  />
                </div>
              </ProfileInformationPanel>
              <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-2">
                <ProfileInformationPanel title="Membership" onEdit={() => {}}>
                  <Field
                    subtitle="Membership type"
                    description={userMembership}
                  />
                  <Field
                    subtitle="Valid til"
                    description={
                      userMembership === "Member"
                        ? `End of ${new Date().getFullYear()}`
                        : ""
                    }
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
                    description={determineUserSkiSnowboardStatus({
                      Ski: currentUserData?.does_ski,
                      Snowboard: currentUserData?.does_snowboarding
                    })}
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
      </ResponsiveBackgroundImage>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}

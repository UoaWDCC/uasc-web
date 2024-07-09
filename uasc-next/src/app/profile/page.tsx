"use client"

import { useAppData } from "@/store/Store"
import ProfileInformationPanel from "@/components/generic/ProfileInformationPanel/ProfileInformationPanel"
import { Footer } from "@/components/generic/Footer/Footer"
import ResponsiveBackgroundImage from "@/components/generic/ResponsiveBackgroundImage/ResponsiveBackground"
import { useForceRefreshToken } from "@/hooks/useRefreshedToken"
import { signOut } from "firebase/auth"
import { auth, fireAnalytics } from "@/firebase"
import { DateUtils } from "@/components/utils/DateUtils"
import { useCallback, useMemo, useState } from "react"
import { useSelfDataQuery } from "@/services/User/UserQueries"
import { useBookingsForSelfQuery } from "@/services/Booking/BookingQueries"
import Table from "@/components/generic/ReusableTable/Table"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/services/QueryClient"
import { useRouter } from "next/navigation"
import Link from "next/link"
import EditPersonalPanel from "./EditPersonalPanel"
import EditAdditionalPanel from "./EditAdditionalPanel"
import Loader from "@/components/generic/SuspenseComponent/Loader"

const SignOutButton = () => {
  const router = useRouter()
  const handleOnclick = async () => {
    await signOut(auth)
    router.push("/login")
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
  description?: string | JSX.Element
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

type BookingTableColumn = {
  uid: string
  /**
   * A date **string** to display on the table
   */
  Date: string
}
const defaultBookingTableData: BookingTableColumn[] = [{ uid: "", Date: "" }]

/**
 * Contains all the logic for fetching the bookings for current user
 */
const ProfileBookingsTable = () => {
  const { data } = useBookingsForSelfQuery()

  const bookingTableData: BookingTableColumn[] = useMemo(() => {
    if (!data) {
      return defaultBookingTableData
    }
    let dates =
      data.dates?.map((date) => {
        return { uid: date, Date: date }
      }) || bookingTableData

    // We get the dates as a UTC one so its ok to parse like this
    dates.sort(
      (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
    )

    dates = dates.map((date) => {
      return { ...date, Date: DateUtils.formattedNzDate(new Date(date.Date)) }
    })

    return dates
  }, [data])

  return (
    <ProfileInformationPanel title="Current bookings">
      <h5>
        Head to{" "}
        <Link href="/bookings" className="text-light-blue-100 font-bold">
          Bookings
        </Link>{" "}
        to make a booking!
      </h5>
      <h5>
        Please email{" "}
        <a
          className="text-light-blue-100 font-bold"
          href="mailto:club.admin@uasc.co.nz"
        >
          club.admin@uasc.co.nz
        </a>{" "}
        for any alteration requests
      </h5>
      <Table data={bookingTableData} />
    </ProfileInformationPanel>
  )
}

type EditPanels = "none" | "personal" | "additional"

function ProfileInner() {
  const [{ currentUser, currentUserClaims }] = useAppData()
  const { data: currentUserData, isLoading } = useSelfDataQuery()
  const router = useRouter()
  const [editPanelOpen, setEditPanelOpen] = useState<EditPanels>("none")

  const closePanel = useCallback(() => {
    setEditPanelOpen("none")
  }, [])

  useForceRefreshToken()

  const userMembership = useMemo(() => {
    if (currentUserClaims?.admin) return "Admin"
    if (currentUserClaims?.member) return "Member"
    return "Guest"
  }, [currentUserClaims])

  if (!currentUser) {
    router.push("/login")
    return <Loader />
  }

  return (
    <div className={`relative min-h-screen ${isLoading && "blur-md"}`}>
      <ResponsiveBackgroundImage>
        <EditPersonalPanel
          isOpen={editPanelOpen === "personal"}
          handleClose={closePanel}
        />
        <EditAdditionalPanel
          isOpen={editPanelOpen === "additional"}
          handleClose={closePanel}
        />
        <div className="max-w-[1100px] py-8">
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
                onEdit={() => {
                  setEditPanelOpen("personal")
                  fireAnalytics("screen_view", { screen_name: "edit personal" })
                }}
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
                      `${DateUtils.timestampToDate(currentUserData?.date_of_birth).toLocaleDateString("en-NZ")}`
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
                <ProfileInformationPanel title="Membership">
                  <Field
                    subtitle="Membership type"
                    description={userMembership}
                  />
                  <Field
                    subtitle="Valid til"
                    description={
                      userMembership === "Member" ? (
                        `End of ${new Date().getFullYear()}`
                      ) : userMembership === "Guest" ? (
                        <Link href="/register" className="text-light-blue-100">
                          Sign up
                        </Link>
                      ) : (
                        <p className="text-red font-bold">No Expiry Date</p>
                      )
                    }
                  />
                </ProfileInformationPanel>
                <ProfileInformationPanel
                  title="Additional details"
                  onEdit={() => {
                    setEditPanelOpen("additional")
                    fireAnalytics("screen_view", {
                      screen_name: "edit additional"
                    })
                  }}
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
                <ProfileBookingsTable />
              </div>
            </div>
          </div>
        </div>
      </ResponsiveBackgroundImage>
      <Footer />
    </div>
  )
}

export default function Profile() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileInner />
    </QueryClientProvider>
  )
}

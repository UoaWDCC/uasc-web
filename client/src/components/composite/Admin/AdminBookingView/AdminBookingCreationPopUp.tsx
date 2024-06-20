import AdminSearchBar from "../AdminMemberView/AdminSearchBar"
import { CombinedUserData } from "models/User"
import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import DateRangePicker from "components/generic/DateRangePicker/DateRangePicker"
import { useState, useMemo } from "react"

interface IAdminBookingCreationPopUp {
  bookingCreationHandler?: () => void
  /**
   * Callback for when a 'close' event is triggered with the modal open
   */
  handleClose?: () => void
  users?: CombinedUserData[]
}

enum FlowStages {
  SEARCH_FOR_USER = "search_for_user",
  SELECT_USER = "select_user",
  VIEW_USER = "view_user",
  SELECT_DATES = "select_dates"
}

const Divider = () => {
  return (
    <div className="bg-gray-3 ml-auto hidden h-screen w-[1px] sm:block"></div>
  )
}

const AdminBookingCreationPopUp = ({
  handleClose,
  users = []
}: IAdminBookingCreationPopUp) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState<
    string | undefined
  >(undefined)

  const [currentStage, setCurrentStage] = useState<FlowStages>(
    FlowStages.SEARCH_FOR_USER
  )

  const [currentSelectedUserUid, setCurrentSelectedUserUid] = useState<
    string | undefined
  >(undefined)

  const onQueryChanged = (newQuery: string) => {
    if (newQuery.length < 2) {
      setCurrentSearchQuery(undefined)
      return
    }

    setCurrentSearchQuery(newQuery)
  }

  const handleSelectUser = (uid: string) => {
    setCurrentSelectedUserUid(uid)
  }

  const usersToDisplay = useMemo(() => {
    if (currentSearchQuery) {
      return users.filter(
        (user) =>
          user.email.toLowerCase().includes(currentSearchQuery) ||
          user.first_name.toLowerCase().includes(currentSearchQuery) ||
          user.membership !== "admin"
      )
    } else {
      return []
    }
  }, [currentSearchQuery, users])

  const currentlySelectedUser = useMemo(() => {
    return usersToDisplay.find((user) => user.uid === currentSelectedUserUid)
  }, [currentSelectedUserUid])

  const DetailedUserInfoPanel = () => (
    <div className="flex flex-col">
      <p>Name</p>
      <p>
        {currentlySelectedUser?.first_name} {currentlySelectedUser?.last_name}
      </p>
      <p></p>

      <p>{currentlySelectedUser?.dietary_requirements}</p>
      <p> {currentlySelectedUser?.email}</p>
      <p> {currentlySelectedUser?.phone_number}</p>
    </div>
  )

  return (
    <div className="flex w-full max-w-[900px] flex-col gap-7 sm:flex-row">
      <div className="flex w-full flex-col sm:basis-1/2">
        <p className="opacity-20">Select user</p>
        <AdminSearchBar
          onQueryChanged={(newQuery: string) => onQueryChanged(newQuery)}
        />

        {currentlySe ? (
          <DetailedUserInfoPanel />
        ) : (
          <div className="border-gray-3 rounded-md border">
            {usersToDisplay.map((user) => (
              <div
                key={user.uid}
                className="flex w-full p-2 hover:bg-white"
                onClick={() => handleSelectUser(user.uid)}
              >
                <p>
                  {user.first_name} {user.last_name}
                </p>
                <p
                  className={`ml-auto font-bold uppercase ${
                    user.membership === "member"
                      ? "text-dark-blue-100"
                      : "text-gray-3"
                  }`}
                >
                  {user.membership}
                </p>
              </div>
            ))}
          </div>
        )}
        <span className="mt-auto">
          <Button>Select User</Button>
        </span>
        <p className="mt-8">Creating booking for:</p>
      </div>
      <Divider />
      <div className="flex sm:basis-1/2">
        <div className="w-full max-w-[380px]">
          <Calendar />
          <DateRangePicker />
          <Button>Add New Booking</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingCreationPopUp

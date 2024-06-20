import AdminSearchBar from "../AdminMemberView/AdminSearchBar"
import { CombinedUserData } from "models/User"
import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import DateRangePicker from "components/generic/DateRangePicker/DateRangePicker"
import { useState, useMemo } from "react"
import CloseButton from "assets/icons/x.svg?react"
import LeftArrowButton from "assets/icons/leftarrow.svg?react"

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
    <div className="border-gray-3 mt-4 flex flex-col gap-3 rounded-sm border px-4 py-3">
      <span className="flex">
        <h5 className="font-bold uppercase">
          {currentlySelectedUser?.membership}
        </h5>
        <div
          onClick={() => setCurrentSelectedUserUid(undefined)}
          className="ml-auto h-[15px] w-[15px] cursor-pointer"
        >
          <CloseButton />
        </div>
      </span>
      <p>
        {currentlySelectedUser?.first_name} {currentlySelectedUser?.last_name}
      </p>
      <div className="flex flex-col">
        <p className="text-gray-3">Allergies/Dietary Requirements</p>
        <p>{currentlySelectedUser?.dietary_requirements}</p>
      </div>

      <div className="flex flex-col">
        <p className="text-gray-3">Email</p>
        <p> {currentlySelectedUser?.email}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-3">Number</p>
        <p> {currentlySelectedUser?.phone_number}</p>
      </div>
    </div>
  )

  return (
    <div className="flex w-full max-w-[900px] flex-col gap-7 sm:flex-row">
      <div className="flex w-full flex-col sm:basis-1/2">
        <p className="opacity-20">Select user</p>
        <AdminSearchBar
          onQueryChanged={(newQuery: string) => onQueryChanged(newQuery)}
        />

        {currentSelectedUserUid ? (
          <DetailedUserInfoPanel />
        ) : (
          <div className="border-gray-3 rounded-md border">
            {usersToDisplay.map((user) => (
              <div
                key={user.uid}
                className="flex w-full p-2"
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
          {currentStage === FlowStages.SELECT_DATES ? (
            <button
              onClick={() => {
                setCurrentStage(FlowStages.SEARCH_FOR_USER)
                setCurrentSelectedUserUid(undefined)
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-[15px] w-[15px] items-center">
                  <LeftArrowButton className="fill-dark-blue-100" />
                </div>
                <h5 className="text-dark-blue-100 font-bold uppercase">
                  Select Different User
                </h5>
              </div>
            </button>
          ) : (
            <Button
              disabled={!currentSelectedUserUid}
              onClick={() => setCurrentStage(FlowStages.SELECT_DATES)}
            >
              Select User
            </Button>
          )}
        </span>
        <p className="mt-8">Creating booking for:</p>
      </div>
      <Divider />
      <div className="flex sm:basis-1/2">
        <div className="w-full max-w-[380px]">
          <Calendar />
          <DateRangePicker />
          <Button disabled={currentStage !== FlowStages.SELECT_DATES}>
            Add New Booking
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingCreationPopUp

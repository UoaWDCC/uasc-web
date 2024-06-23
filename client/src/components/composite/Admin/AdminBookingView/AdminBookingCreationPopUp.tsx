import AdminSearchBar from "../AdminMemberView/AdminSearchBar"
import { CombinedUserData } from "models/User"
import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import DateRangePicker from "components/generic/DateRangePicker/DateRangePicker"
import { useState, useMemo } from "react"
import CloseButton from "assets/icons/x.svg?react"
import LeftArrowButton from "assets/icons/leftarrow.svg?react"
import Tick from "assets/icons/tick.svg?react"
import { NEXT_YEAR_FROM_TODAY, TODAY } from "utils/Constants"
import { DateRange, DateUtils } from "components/utils/DateUtils"
import { BookingAvailability } from "models/Booking"

interface IAdminBookingCreationPopUp {
  bookingCreationHandler?: () => void
  /**
   * Callback for when a 'close' event is triggered with the modal open
   */
  handleClose?: () => void

  /**
   * The "unfiltered" booking slots for processing
   */
  bookingSlots?: BookingAvailability[]

  users?: CombinedUserData[]
}

enum FlowStages {
  SEARCH_FOR_USER = "search_for_user",
  SELECT_DATES = "select_dates"
}

const Divider = () => {
  return (
    <div className="bg-gray-3 ml-auto hidden h-full w-[1px] md:block"></div>
  )
}

const AdminBookingCreationPopUp = ({
  handleClose,
  bookingSlots = [],
  users = []
}: IAdminBookingCreationPopUp) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date()
  })

  const { startDate: currentStartDate, endDate: currentEndDate } =
    selectedDateRange

  const disabledDates = DateUtils.unavailableDates(bookingSlots)

  /**
   * Function to be called to confirm the date range selected by the user.
   *
   * Will notify user if an unavailable date was included in the new date range
   *
   * @param startDate the first date of the range
   * @param endDate the last date of the range
   */
  const checkValidRange = (startDate: Date, endDate: Date) => {
    const dateArray = DateUtils.datesToDateRange(startDate, endDate)
    if (
      dateArray.some(
        (date) =>
          disabledDates.some((disabledDate) =>
            DateUtils.dateEqualToTimestamp(date, disabledDate.date)
          ) ||
          !bookingSlots.some((slot) =>
            DateUtils.dateEqualToTimestamp(date, slot.date)
          )
      )
    ) {
      alert("Invalid date range, some dates are unavailable")
      return false
    }
    return true
  }

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
          (user.email.toLowerCase().includes(currentSearchQuery) ||
            user.first_name.toLowerCase().includes(currentSearchQuery) ||
            user.last_name.toLowerCase().includes(currentSearchQuery)) &&
          user.membership !== "admin"
      )
    } else {
      return []
    }
  }, [currentSearchQuery, users])

  const currentlySelectedUser = useMemo(() => {
    return usersToDisplay.find((user) => user.uid === currentSelectedUserUid)
  }, [currentSelectedUserUid])

  const UserList = useMemo(
    () => (
      <div
        className={`border-gray-3 rounded-md border ${!currentSearchQuery && "border-none"} `}
      >
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
    ),
    [usersToDisplay]
  )

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
    <div className="flex h-full w-full max-w-[820px] flex-col gap-8 bg-white px-8 py-8">
      <span className="flex justify-between">
        <h3 className="text-dark-blue-100">Add a booking</h3>
        <div className="h-[15px] w-[15px] cursor-pointer" onClick={handleClose}>
          <CloseButton />
        </div>
      </span>
      <div className="flex h-full w-full flex-col gap-7 md:flex-row">
        <div className="flex w-full flex-col md:basis-1/2">
          <span
            className={`${currentStage === FlowStages.SELECT_DATES && "pointer-events-none blur-sm"}`}
          >
            <p className="opacity-20">Select user</p>
            <AdminSearchBar
              onQueryChanged={(newQuery: string) => onQueryChanged(newQuery)}
            />
          </span>
          {currentStage === FlowStages.SELECT_DATES && (
            <div>
              <p className="mt-8">Creating booking for:</p>
              <div
                className="border-gray-3 navbar-shadow mt-4 flex items-center
                            justify-between gap-2 rounded-sm border p-6"
              >
                <div className="flex flex-col">
                  <h5 className="font-bold uppercase">
                    {currentlySelectedUser?.membership}
                  </h5>
                  <h4>
                    {currentlySelectedUser?.first_name}{" "}
                    {currentlySelectedUser?.last_name}
                  </h4>
                </div>

                <div className="h-[15px] w-[15px]">
                  <Tick />
                </div>
              </div>
            </div>
          )}

          {currentStage !==
          FlowStages.SEARCH_FOR_USER ? null : currentSelectedUserUid ? (
            <DetailedUserInfoPanel />
          ) : (
            UserList
          )}
          <span className="mt-8">
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
        </div>
        <Divider />
        <div
          className={`flex md:basis-1/2 ${currentStage === FlowStages.SELECT_DATES ? "pointer-events-auto" : "pointer-events-none blur-sm"}`}
        >
          <div className="w-full max-w-[380px]">
            <Calendar
              minDate={TODAY}
              minDetail="year"
              maxDetail="month"
              maxDate={NEXT_YEAR_FROM_TODAY}
              selectRange
              value={
                currentStartDate && currentEndDate
                  ? [currentStartDate, currentEndDate]
                  : undefined
              }
              tileDisabled={({ date, view }) =>
                view !== "year" &&
                (!bookingSlots.some((slot) =>
                  DateUtils.UTCDatesEqual(slot.date, date)
                ) ||
                  disabledDates.some((slot) =>
                    DateUtils.UTCDatesEqual(slot.date, date)
                  ))
              }
              tileContent={({ date }) => {
                const slot = bookingSlots.find(
                  (slot) =>
                    DateUtils.UTCDatesEqual(slot.date, date) &&
                    slot.availableSpaces > 0
                )
                return slot ? (
                  <p className="text-xs">
                    {slot?.availableSpaces}/{slot.maxBookings}
                  </p>
                ) : null
              }}
              onChange={(e) => {
                const [start, end] = e as [Date, Date]
                if (
                  checkValidRange(
                    DateUtils.convertLocalDateToUTCDate(start),
                    DateUtils.convertLocalDateToUTCDate(end)
                  )
                ) {
                  setSelectedDateRange({
                    startDate: start,
                    endDate: end
                  })
                }
              }}
              returnValue="range"
            />
            <DateRangePicker
              valueStart={new Date()}
              valueEnd={new Date()}
              handleDateRangeInputChange={() => {}}
            />
            <Button disabled={currentStage !== FlowStages.SELECT_DATES}>
              Add New Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingCreationPopUp

import Calendar from "components/generic/Calendar/Calendar"
import BookingInfoComponent from "../Booking/BookingInfoComponent/BookingInfoComponent"
import LongRightArrow from "assets/icons/long_right_arrow.svg?react"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { useState } from "react"
import { useAppData } from "store/Store"
import { SignUpNotif } from "components/generic/SignUpNotif/SignUpNotif"
import { useAvailableBookingsQuery } from "services/Booking/BookingQueries"
import { BookingAvailability } from "models/Booking"
import { MS_IN_SECOND } from "utils/Constants"

type DateRange = {
  startDate: Date
  endDate: Date
}

const formatDateForInput = (date?: Date) => {
  return date?.toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" })
}

// WARNING: Exported for testing purposes only
export const handleDateRangeInputChange = (
  startDate: Date,
  endDate: Date,
  setDateFunction: React.Dispatch<React.SetStateAction<any>>
) => {
  if (endDate < startDate) {
    // Swap the dates if the end date is before the start date
    setDateFunction({
      startDate: endDate,
      endDate: startDate
    })
  } else {
    setDateFunction({
      startDate,
      endDate
    })
  }
}

interface ICreateBookingSection {
  bookingSlots?: BookingAvailability[]
}

// TODO: Pass available dates into here as props, // TODO: and onBookingCreated handler
export const CreateBookingSection = ({
  bookingSlots = []
}: ICreateBookingSection) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date()
  })

  const { startDate: currentStartDate, endDate: currentEndDate } =
    selectedDateRange

  return (
    <>
      <div
        className="grid w-full max-w-[900px] grid-cols-1 items-center justify-items-center gap-2 px-1
                      sm:px-0 md:grid-cols-2"
      >
        <div className="h-full max-h-[475px] self-start">
          <BookingInfoComponent
            pricePerNight="40"
            priceSaturday="60"
            priceNonMember="60"
          />
        </div>

        <div className="flex max-w-[381px] flex-col items-center gap-2">
          <Calendar
            minDate={new Date()}
            minDetail="year"
            maxDetail="month"
            selectRange
            value={
              currentStartDate && currentEndDate
                ? [currentStartDate, currentEndDate]
                : undefined
            }
            tileContent={({ date }) => {
              const slot = bookingSlots.find(
                (slot) =>
                  new Date(slot.date.seconds * MS_IN_SECOND).toDateString() ===
                    date.toDateString() && slot.availableSpaces > 0
              )
              return slot ? (
                <p>
                  {slot?.availableSpaces}/{slot.maxBookings}
                </p>
              ) : null
            }}
            onChange={(e) => {
              const range = e as [Date, Date]
              setSelectedDateRange({
                startDate: range[0],
                endDate: range[1]
              })
            }}
            returnValue="range"
          />
          <span className="mb-4 mt-3 flex items-center gap-1">
            <TextInput
              label="From"
              type="date"
              value={formatDateForInput(selectedDateRange.startDate)}
              data-testid="start-date-picker"
              onChange={(e) =>
                handleDateRangeInputChange(
                  e.target.valueAsDate || new Date(),
                  currentEndDate,
                  setSelectedDateRange
                )
              }
            />
            <span className="mt-5 w-6">
              <LongRightArrow />
            </span>
            <TextInput
              label="To"
              type="date"
              data-testid="end-date-picker"
              value={formatDateForInput(selectedDateRange.endDate)}
              onChange={(e) =>
                handleDateRangeInputChange(
                  currentStartDate,
                  e.target.valueAsDate || new Date(),
                  setSelectedDateRange
                )
              }
            />
          </span>
          <Button variant="default">Proceed to Payment</Button>
        </div>
      </div>
    </>
  )
}

export const ProtectedCreateBookingSection = () => {
  const [{ currentUser, currentUserClaims }] = useAppData()
  const { data } = useAvailableBookingsQuery()
  if (!currentUserClaims?.member) {
    return <SignUpNotif signedIn={!!currentUser} />
  }
  return <CreateBookingSection bookingSlots={data} />
}

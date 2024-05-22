import Calendar from "components/generic/Calendar/Calendar"
import BookingInfoComponent from "../Booking/BookingInfoComponent/BookingInfoComponent"
import LongRightArrow from "assets/icons/long_right_arrow.svg?react"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { useState } from "react"
import { useAppData } from "store/Store"
import { SignUpNotif } from "components/generic/SignUpNotif/SignUpNotif"

type DateRange = {
  startDate: Date
  endDate: Date
}

const formatDateForInput = (date?: Date) => {
  return date?.toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" })
}

// TODO: Pass available dates into here as props, and onCreate handler
export const CreateBookingSection = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date()
  })

  const { startDate: currentStartDate, endDate: currentEndDate } =
    selectedDateRange

  const handleDateRangeInputChange = (startDate: Date, endDate: Date) => {
    if (endDate < startDate) {
      // Swap the dates if the end date is before the start date
      setSelectedDateRange({
        startDate: endDate,
        endDate: startDate
      })
    } else {
      setSelectedDateRange({
        startDate,
        endDate
      })
    }
  }

  return (
    <>
      <div
        className="grid w-full max-w-[900px] grid-cols-1 items-center justify-items-center gap-2 px-1
                      sm:px-0 md:grid-cols-2"
      >
        <BookingInfoComponent
          pricePerNight="49"
          priceSaturday="69"
          priceNonMember="23"
        />

        <div className="flex max-w-[381px] flex-col items-center gap-2">
          <Calendar
            selectRange
            value={
              currentStartDate && currentEndDate
                ? [currentStartDate, currentEndDate]
                : undefined
            }
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
              onChange={(e) =>
                handleDateRangeInputChange(
                  e.target.valueAsDate || new Date(),
                  currentEndDate
                )
              }
            />
            <span className="mt-5 w-8">
              <LongRightArrow />
            </span>
            <TextInput
              label="To"
              type="date"
              value={formatDateForInput(selectedDateRange.endDate)}
              onChange={(e) =>
                handleDateRangeInputChange(
                  currentStartDate,
                  e.target.valueAsDate || new Date()
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
  if (!currentUserClaims?.member) {
    return <SignUpNotif signedIn={!!currentUser} />
  }
  return <CreateBookingSection />
}

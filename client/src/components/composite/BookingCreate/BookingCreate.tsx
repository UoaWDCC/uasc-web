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
export const CreateBookingPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date()
  })
  return (
    <>
      <div
        className=" grid w-full max-w-[900px] grid-cols-1 items-center justify-items-center
                      gap-2 md:grid-cols-2 md:gap-5"
      >
        <BookingInfoComponent
          pricePerNight="49"
          priceSaturday="69"
          priceNonMember="23"
        />

        <div className="flex flex-col items-center gap-2">
          <Calendar
            selectRange
            value={
              selectedDateRange.startDate && selectedDateRange.endDate
                ? [selectedDateRange.startDate, selectedDateRange.endDate]
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
                setSelectedDateRange({
                  ...selectedDateRange,
                  startDate: e.target.valueAsDate || new Date()
                })
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
                setSelectedDateRange({
                  ...selectedDateRange,
                  endDate: e.target.valueAsDate || new Date()
                })
              }
            />
          </span>
          <Button variant="default">Proceed to Payment</Button>
        </div>
      </div>
    </>
  )
}

export const ProtectedCreateBookingPage = () => {
  const [{ currentUser, currentUserClaims }] = useAppData()
  if (!currentUserClaims?.member) {
    return <SignUpNotif signedIn={!!currentUser} />
  }
  return <CreateBookingPage />
}

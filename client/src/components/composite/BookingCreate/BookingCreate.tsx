import Calendar from "components/generic/Calendar/Calendar"
import BookingInfoComponent from "../Booking/BookingInfoComponent/BookingInfoComponent"
import LongRightArrow from "assets/icons/long_right_arrow.svg?react"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { useState } from "react"
import { Range } from "react-calendar/dist/cjs/shared/types"

type DateRange = {
  startDate: Date
  endDate: Date
}

const formatDateForInput = (date?: Date) => {
  return date?.toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" })
}

const CreateBookingPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date()
  })
  return (
    <div
      className="bg-home-ski-image relative z-10 flex min-h-[90vh] w-full
      justify-center bg-cover bg-top bg-no-repeat"
    >
      <div className="bg-gray-1 pointer-events-none absolute -z-20 min-h-[90vh] w-full opacity-90" />
      <div
        className=" grid w-full max-w-[900px] grid-cols-1 items-center justify-items-center
                      gap-2 md:grid-cols-2"
      >
        <span className="max-w-full sm:max-w-[350px] ">
          <BookingInfoComponent
            pricePerNight="49"
            priceSaturday="69"
            priceNonMember="23"
          />
        </span>

        <div className="flex flex-col items-center gap-2">
          <Calendar
            selectRange
            value={
              selectedDateRange.startDate && selectedDateRange.endDate
                ? [selectedDateRange.startDate, selectedDateRange.endDate]
                : undefined
            }
            onChange={(e) => {
              const range = e as Range<Date>
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
    </div>
  )
}

export default CreateBookingPage

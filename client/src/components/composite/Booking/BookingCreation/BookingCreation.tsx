import Calendar from "components/generic/Calendar/Calendar"
import BookingInfoComponent from "../BookingInfoComponent/BookingInfoComponent"
import LongRightArrow from "assets/icons/long_right_arrow.svg?react"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { useEffect, useState } from "react"

import { BookingAvailability } from "models/Booking"
import { NEXT_YEAR_FROM_TODAY, TODAY } from "utils/Constants"
import { timestampToDate } from "components/utils/Utils"
import { Timestamp } from "firebase/firestore"
import Checkbox from "components/generic/Checkbox/Checkbox"

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
  handleBookingCreation?: (startDate: Timestamp, endDate: Timestamp) => void
  hasExistingSession?: boolean
  isPending?: boolean
}

export const CreateBookingSection = ({
  bookingSlots = [],
  handleBookingCreation,
  hasExistingSession,
  isPending
}: ICreateBookingSection) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date()
  })

  const [isValidForCreation, setIsValidForCreation] = useState<boolean>(false)

  const { startDate: currentStartDate, endDate: currentEndDate } =
    selectedDateRange

  const disabledDates = bookingSlots.filter((slot) => slot.availableSpaces <= 0)

  /**
   * Function to be called to confirm the date range selected by the user.
   *
   * Will notify user if an unavailable date was included in the new date range
   *
   * @param startDate the first date of the range
   * @param endDate the last date of the range
   */
  const checkValidRange = (startDate: Date, endDate: Date) => {
    const dateArray = []
    const currentDate = new Date(startDate)

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate))
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + 1)
    }
    if (
      dateArray.some(
        (date) =>
          disabledDates.some(
            (disabledDate) =>
              timestampToDate(disabledDate.date).toDateString() ===
              date.toDateString()
          ) ||
          !bookingSlots.some(
            (slot) =>
              timestampToDate(slot.date).toDateString() === date.toDateString()
          )
      )
    ) {
      alert("Invalid date range, some dates are unavailable")
      return false
    }
    return true
  }

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
            tileDisabled={({ date }) =>
              !bookingSlots.some(
                (slot) =>
                  timestampToDate(slot.date).toDateString() ===
                  date.toDateString()
              ) ||
              disabledDates.some(
                (slot) =>
                  timestampToDate(slot.date).toDateString() ===
                  date.toDateString()
              )
            }
            tileContent={({ date }) => {
              const slot = bookingSlots.find(
                (slot) =>
                  timestampToDate(slot.date).toDateString() ===
                    date.toDateString() && slot.maxBookings > 0
              )
              return slot ? (
                <p className="text-xs">
                  {slot?.availableSpaces}/{slot.maxBookings}
                </p>
              ) : null
            }}
            onChange={(e) => {
              const range = e as [Date, Date]
              if (checkValidRange(range[0], range[1])) {
                setSelectedDateRange({
                  startDate: range[0],
                  endDate: range[1]
                })
              }
            }}
            returnValue="range"
          />
          <span className="mb-4 mt-3 flex items-center gap-1">
            <TextInput
              label="From"
              type="date"
              value={formatDateForInput(selectedDateRange.startDate)}
              data-testid="start-date-picker"
              onChange={(e) => {
                const newStartDate = e.target.valueAsDate || new Date()
                if (checkValidRange(newStartDate, currentEndDate))
                  handleDateRangeInputChange(
                    newStartDate,
                    currentEndDate,
                    setSelectedDateRange
                  )
              }}
            />
            <span className="mt-5 w-6">
              <LongRightArrow />
            </span>
            <TextInput
              label="To"
              type="date"
              data-testid="end-date-picker"
              value={formatDateForInput(selectedDateRange.endDate)}
              onChange={(e) => {
                const newEndDate = e.target.valueAsDate || new Date()
                if (checkValidRange(currentStartDate, newEndDate))
                  handleDateRangeInputChange(
                    currentStartDate,
                    newEndDate,
                    setSelectedDateRange
                  )
              }}
            />
          </span>

          <RequirementCheckBoxes
            onValidityChange={(newValid) => {
              setIsValidForCreation(newValid)
            }}
          />

          <Button
            disabled={isPending}
            variant="default"
            onClick={() => {
              if (!isValidForCreation) {
                alert("Please check all the required acknowledgements")
                return
              }
              if (
                checkValidRange(currentStartDate, currentEndDate) &&
                confirm("Are you sure you want to book these dates?")
              )
                handleBookingCreation?.(
                  Timestamp.fromDate(currentStartDate),
                  Timestamp.fromDate(currentEndDate)
                )
            }}
          >
            {hasExistingSession
              ? "Continue Existing Session"
              : "Proceed to Payment"}
          </Button>
        </div>
      </div>
    </>
  )
}

const RequirementCheckBoxes = ({
  onValidityChange
}: {
  onValidityChange: (newValid: boolean) => void
}) => {
  const [acceptedRequirements, setAcceptedRequirements] = useState<{
    nightPolicy?: boolean
    bookingPolicy?: boolean
  }>({})
  useEffect(() => {
    onValidityChange(
      !!acceptedRequirements.nightPolicy && !!acceptedRequirements.bookingPolicy
    )
  }, [acceptedRequirements])

  return (
    <span className="flex w-full flex-col gap-1">
      <Checkbox
        onChange={(e) => {
          setAcceptedRequirements({
            ...acceptedRequirements,
            nightPolicy: e.target.checked
          })
        }}
        label="I understand that each date corresponds to one night"
      />
      <Checkbox
        label="I have read and acknowledged the booking policy"
        onChange={(e) => {
          setAcceptedRequirements({
            ...acceptedRequirements,
            bookingPolicy: e.target.checked
          })
        }}
      />
    </span>
  )
}

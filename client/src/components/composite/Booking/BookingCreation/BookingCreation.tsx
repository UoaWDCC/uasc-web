import Calendar from "components/generic/Calendar/Calendar"
import BookingInfoComponent from "../BookingInfoComponent/BookingInfoComponent"
import LongRightArrow from "assets/icons/long_right_arrow.svg?react"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { useEffect, useMemo, useState } from "react"

import { BookingAvailability } from "models/Booking"
import { NEXT_YEAR_FROM_TODAY, TODAY } from "utils/Constants"
import {
  datesToDateRange,
  formattedNzDate,
  isSingleFridayOrSaturday,
  timestampToDate
} from "components/utils/Utils"
import { Timestamp } from "firebase/firestore"
import Checkbox from "components/generic/Checkbox/Checkbox"

type DateRange = {
  /**
   * Javascript date object representing the date of the first night for the booking
   */
  startDate: Date

  /**
   * Javascript date object representing the date of the last night for the booking
   */
  endDate: Date
}

const formatDateForInput = (date?: Date) => {
  return date?.toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" })
}

/*
 * Swaps around dates if invalid
 * @deprecated Exported for testing purposes only
 */
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
  /**
   * The "unfiltered" booking slots for processing
   */
  bookingSlots?: BookingAvailability[]

  /**
   * Callback when dates are changed and valid
   */
  handleBookingCreation?: (startDate?: Timestamp, endDate?: Timestamp) => void

  /**
   * To be called when user enters their allergies
   */
  handleAllergyChange?: (newAllergies: string) => void

  /**
   * If the user should be notified that they have to continue their existing session
   */
  hasExistingSession?: boolean

  /**
   * If a request related to creating/fetching a booking is in progress
   */
  isPending?: boolean
}

const NORMAL_PRICE = 40 as const
const SPECIAL_PRICE = 60 as const

export const CreateBookingSection = ({
  bookingSlots = [],
  handleBookingCreation,
  handleAllergyChange,
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
    const dateArray = datesToDateRange(startDate, endDate)
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

  const CreateBookingButton = useMemo(() => {
    return (
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
            confirm(
              `Are you sure you want to book the dates ${formattedNzDate(currentStartDate)} to ${formattedNzDate(currentEndDate)}?`
            )
          )
            handleBookingCreation?.(
              Timestamp.fromDate(currentStartDate),
              Timestamp.fromDate(currentEndDate)
            )
        }}
      >
        Proceed to Payment
      </Button>
    )
  }, [currentStartDate, currentEndDate, isValidForCreation])

  const estimatedPriceString = useMemo(() => {
    const nights = datesToDateRange(currentStartDate, currentEndDate).length
    const requiredPrice = isSingleFridayOrSaturday(
      currentStartDate,
      currentEndDate
    )
      ? SPECIAL_PRICE
      : NORMAL_PRICE

    return `$${requiredPrice} * ${nights} night${nights > 1 ? "s" : ""} = $${requiredPrice * nights}`
  }, [currentStartDate, currentEndDate])

  return (
    <>
      <div
        className="grid w-full max-w-[900px] grid-cols-1 items-center justify-items-center gap-2 px-1
                      sm:px-0 md:grid-cols-2"
      >
        <div className="h-full max-h-[600px] self-start">
          <BookingInfoComponent
            pricePerNight={NORMAL_PRICE.toString()}
            priceSingleFridayOrSaturday={SPECIAL_PRICE.toString()}
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
            tileDisabled={({ date, view }) =>
              view !== "year" &&
              (!bookingSlots.some(
                (slot) =>
                  timestampToDate(slot.date).toDateString() ===
                  date.toDateString()
              ) ||
                disabledDates.some(
                  (slot) =>
                    timestampToDate(slot.date).toDateString() ===
                    date.toDateString()
                ))
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
          <h5 className="self-start font-bold">
            Estimated price: {estimatedPriceString}{" "}
          </h5>
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

          <TextInput
            onChange={(e) => handleAllergyChange?.(e.target.value)}
            label="Please describe your dietary requirements"
          />

          {hasExistingSession ? (
            <Button onClick={() => handleBookingCreation?.()}>
              Continue Existing Session
            </Button>
          ) : (
            CreateBookingButton
          )}
        </div>
      </div>
    </>
  )
}

interface IRequirementCheckBoxes {
  /**
   * @param newValid if the current state of the checkboxes is valid
   */
  onValidityChange: (newValid: boolean) => void
}

/**
 * Provides a way to see if the user has agreed to all required policy
 * @deprecated only for internal use in `BookingCreation`, exported for testing purposes
 */
export const RequirementCheckBoxes = ({
  onValidityChange
}: IRequirementCheckBoxes) => {
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
    <span className="mb-3 flex w-full flex-col gap-1">
      <Checkbox
        data-testid="agreed-to-night-policy-checkbox"
        onChange={(e) => {
          setAcceptedRequirements({
            ...acceptedRequirements,
            nightPolicy: e.target.checked
          })
        }}
        label="I understand that each date corresponds to one night's stay"
      />
      <Checkbox
        data-testid="agreed-to-general-policy-checkbox"
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

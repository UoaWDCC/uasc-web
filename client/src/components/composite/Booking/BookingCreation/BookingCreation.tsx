import Calendar from "@/components/generic/Calendar/Calendar"
import BookingInfoComponent from "../BookingInfoComponent/BookingInfoComponent"
import DateRangePicker from "@/components/generic/DateRangePicker/DateRangePicker"
import TextInput from "@/components/generic/TextInputComponent/TextInput"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { useCallback, useEffect, useMemo, useState } from "react"

import { BookingAvailability } from "@/models/Booking"
import {
  CHECK_IN_TIME,
  CHECK_OUT_TIME,
  MS_IN_SECOND,
  NEXT_YEAR_FROM_TODAY,
  TODAY
} from "@/utils/Constants"
import { Timestamp } from "firebase/firestore"
import Checkbox from "@/components/generic/Checkbox/Checkbox"
import { DateRange, DateUtils } from "@/components/utils/DateUtils"
import { LodgePricingProps } from "@/services/AppData/AppDataService"

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

export interface ICreateBookingSection {
  /**
   * The "unfiltered" booking slots for processing
   */
  bookingSlots?: BookingAvailability[]

  /**
   * Callback when dates are changed and valid
   *
   * **This will be called with a UTC midnight timestamp representing the date**
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

  lodgePrices: LodgePricingProps
}

/**
 * A notification to the user informing the actual
 * start and end dates that they will be staying, as opposed to
 * displaying just the nights.
 *
 * Note that this should not change any booking logic
 */
const ActualBookingStayRange = ({
  startDateTime,
  endDateTime
}: {
  /**
   * a time **string** to display
   */
  startDateTime: string
  /**
   * a time **string** to display
   */
  endDateTime: string
}) => {
  return (
    <h5 className="uppercase">
      The currently selected stay at the lodge will be from{" "}
      <strong className="text-dark-blue-100">{startDateTime}</strong> (check in)
      to <strong className="text-dark-blue-100">{endDateTime}</strong> (check
      out)
    </h5>
  )
}

/**
 * @deprecated not for direct consumption on pages
 */
export const CreateBookingSection = ({
  bookingSlots = [],
  handleBookingCreation,
  handleAllergyChange,
  hasExistingSession,
  isPending,
  lodgePrices
}: ICreateBookingSection) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date()
  })

  /**
   * Derive prices from the props
   */
  const NORMAL_PRICE = lodgePrices.normal
  const SPECIAL_PRICE = lodgePrices.moreExpensive

  const [isValidForCreation, setIsValidForCreation] = useState<boolean>(false)

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
  const checkValidRange = useCallback(
    (startDate: Date, endDate: Date) => {
      const dateArray = DateUtils.datesToDateRange(startDate, endDate)
      if (dateArray.length > 10) {
        alert("You may only book up to 10 days max.")
        return false
      }
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
    },
    [bookingSlots, disabledDates]
  )

  /**
   * Used when the user wants to confirm their choice of dates and is ready to pay
   */
  const CreateBookingButton = useMemo(() => {
    return (
      <Button
        disabled={isPending}
        variant="default"
        onClick={() => {
          if (!isValidForCreation) {
            alert(
              "Please check all the required acknowledgements and enter your dietary requirements"
            )
            return
          }
          if (
            checkValidRange(
              DateUtils.convertLocalDateToUTCDate(currentStartDate),
              DateUtils.convertLocalDateToUTCDate(currentEndDate)
            ) &&
            confirm(
              `Are you sure you want to book the dates ${DateUtils.formattedNzDate(currentStartDate)} to ${DateUtils.formattedNzDate(currentEndDate)}?`
            )
          )
            handleBookingCreation?.(
              Timestamp.fromDate(
                DateUtils.convertLocalDateToUTCDate(currentStartDate)
              ),
              Timestamp.fromDate(
                DateUtils.convertLocalDateToUTCDate(currentEndDate)
              )
            )
        }}
      >
        Proceed to Payment
      </Button>
    )
  }, [
    currentStartDate,
    currentEndDate,
    isValidForCreation,
    isPending,
    checkValidRange,
    handleBookingCreation
  ])

  /**
   *  a string to be shown to the user about the price for their date selection
   */
  const estimatedPriceString = useMemo(() => {
    const nights = DateUtils.datesToDateRange(
      currentStartDate,
      currentEndDate
    ).length
    const requiredPrice = DateUtils.isSingleFridayOrSaturday(
      currentStartDate,
      currentEndDate
    )
      ? SPECIAL_PRICE
      : NORMAL_PRICE

    return `$${requiredPrice} * ${nights} night${nights > 1 ? "s" : ""} = $${requiredPrice * nights}` as const
  }, [currentStartDate, currentEndDate, SPECIAL_PRICE, NORMAL_PRICE])

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
          <h5 className="self-start font-bold">
            Estimated price: {estimatedPriceString}{" "}
          </h5>
          <DateRangePicker
            valueStart={currentStartDate}
            valueEnd={currentEndDate}
            handleDateRangeInputChange={(start, end) => {
              const newStartDate = start || currentStartDate
              const newEndDate = end || currentEndDate
              if (
                checkValidRange(
                  DateUtils.convertLocalDateToUTCDate(newStartDate),
                  DateUtils.convertLocalDateToUTCDate(newEndDate)
                )
              )
                handleDateRangeInputChange(
                  newStartDate,
                  newEndDate,
                  setSelectedDateRange
                )
            }}
          />

          <ActualBookingStayRange
            startDateTime={`${DateUtils.formattedNzDate(currentStartDate)} ${CHECK_IN_TIME}`}
            // Need to add one day to this because the checkout is the day after the last night
            endDateTime={`${DateUtils.formattedNzDate(new Date(currentEndDate.getTime() + 24 * 60 * 60 * MS_IN_SECOND))} ${CHECK_OUT_TIME}`}
          />

          <RequirementCheckBoxes
            onValidityChange={(newValid) => {
              setIsValidForCreation(newValid)
            }}
            handleAllergyChange={handleAllergyChange}
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

  /**
   * @param newAllergies
   */
  handleAllergyChange?: (newAllergies: string) => void
}

/**
 * To allow users to enter "no"
 */
const DIETARY_REQUIREMENTS_MIN_LENGTH = 2 as const

/**
 * Provides a way to see if the user has agreed to all required policy
 * @deprecated only for internal use in `BookingCreation`, exported for testing purposes
 */
export const RequirementCheckBoxes = ({
  onValidityChange,
  handleAllergyChange
}: IRequirementCheckBoxes) => {
  const [acceptedRequirements, setAcceptedRequirements] = useState<{
    nightPolicy?: boolean
    bookingPolicy?: boolean
    dietaryRequirements?: boolean
  }>({})
  useEffect(() => {
    onValidityChange(
      !!acceptedRequirements.nightPolicy &&
        !!acceptedRequirements.bookingPolicy &&
        !!acceptedRequirements.dietaryRequirements
    )
  }, [acceptedRequirements, onValidityChange])

  return (
    <>
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

      <TextInput
        onChange={(e) => {
          handleAllergyChange?.(e.target.value)

          setAcceptedRequirements({
            ...acceptedRequirements,
            dietaryRequirements:
              e.target.value.length >= DIETARY_REQUIREMENTS_MIN_LENGTH
          })
        }}
        data-testid="dietary-requirements-input"
        label="Please describe your dietary requirements"
        placeholder="Enter dietary requirements here"
      />
    </>
  )
}

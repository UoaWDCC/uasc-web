import { CHECK_IN_TIME, CHECK_OUT_TIME } from "@/utils/Constants"
import Link from "next/link"
import { useMemo } from "react"

type SuccessfulBookingProps = {
  /**
   * Date string indicating the _first_ **night** of the successful booking
   * - Must be in the format `dd/mm/yyyy`
   */
  startDate?: string
  /**
   * Date string indicating the _last_ **night** of the successful booking
   * Must be in the format `dd/mm/yyyy`
   */
  endDate?: string

  /**
   * Whether a new night should be computed internally, this means adding
   * a day to the `endDate` to correctly display the check-out time
   */
  datesAlreadyFormatted?: boolean
}

/**
 * Component to be displayed to a user after they are redirected back to the
 * site after a successful stripe payment for a booking.
 */
const SuccessfulBooking = ({
  startDate,
  endDate,
  datesAlreadyFormatted = false
}: SuccessfulBookingProps) => {
  const actualStayRangeString = useMemo(() => {
    try {
      const endDateParts = endDate?.split("/")
      /**
       * Will invoke catch block if the number can not be parsed
       */
      const day = Number.parseInt(endDateParts![0]) + 1
      const month = endDateParts?.[1]
      const year = endDateParts?.[2]

      if (!datesAlreadyFormatted && endDateParts?.length === 3) {
        return `${startDate} ${CHECK_IN_TIME} (Check in) to ${day}/${month}/${year} ${CHECK_OUT_TIME} (Check out)`
      }

      return `${startDate} to ${endDate}`
    } catch (e) {
      console.info(
        "There was an error parsing the date range for this booking, using the raw string values"
      )

      return `${startDate} to ${endDate}`
    }
  }, [startDate, endDate, datesAlreadyFormatted])

  return (
    <>
      <div className="border-gray-3 h-auto w-full rounded-md border-2 bg-white py-5">
        <h3 className="text-dark-blue-100 xxs:mb-5 mb-10 mt-5 text-center font-bold">
          Your lodge booking has been confirmed!
        </h3>
        <h5 className="text-dark-blue-100 case-capital text-center font-bold uppercase">
          You have booked for:
        </h5>
        <h4 className="text-dark-blue-100 xxs:mb-5 mb-10 mt-1 text-center">
          {actualStayRangeString}
        </h4>
        <h4 className="text-dark-blue-100 xxs:mb-10 mb-20 text-center">
          Please check your email for the confirmation.
        </h4>
        <div className="mb-2 flex justify-center">
          <button className="text-dark-blue-100 border-dark-blue-100 hover:bg-dark-blue-100 rounded-md border bg-white p-2 text-sm font-bold hover:scale-105 hover:text-white">
            <Link href="/bookings">Back to Bookings</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default SuccessfulBooking

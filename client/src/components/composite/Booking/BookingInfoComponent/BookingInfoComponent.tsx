"use client"

import { CHECK_IN_TIME, CHECK_OUT_TIME } from "@/utils/Constants"
import Link from "next/link"

interface IBookingInfoProps {
  /**
   * The price to *display* for a "normal booking"
   */
  pricePerNight: string
  /**
   * The price to *display* for a single friday/saturday
   */
  priceSingleFridayOrSaturday: string
}

type props = IBookingInfoProps

const Divider = () => <span className="bg-dark-blue-100 my-3 h-[1px] w-full" />

/**
 * Do **not** confuse with `LodgfeInfoComponent` which is used for display on the `/bookings` route
 */
const BookingInfoComponent = ({
  pricePerNight,
  priceSingleFridayOrSaturday
}: props) => {
  return (
    <div className="border-gray-3 flex h-full w-full flex-col justify-center rounded border bg-white px-6 py-12 pb-8">
      <div id="top" className="text-dark-blue-100 flex flex-col gap-2">
        <h3 className="flex gap-2">
          ${pricePerNight}
          <h3 className="font-normal">per night</h3>
        </h3>
        <h3 className="flex gap-2">
          ${priceSingleFridayOrSaturday}
          <h3 className="font-normal">a single Friday or Saturday</h3>
        </h3>
        <h5>
          Bookings can <strong>only</strong> be made for the user on this
          account
        </h5>
        <h5 className="font-normal">
          For guest bookings please email{" "}
          <a href="mailto:bookings@uasc.co.nz">
            <strong>bookings@uasc.co.nz</strong>
          </a>
        </h5>
        {/* TODO: REMOVE THIS PART AND CONNECT TO CMS */}
        <p>Bookings open - 29th of June </p>
        <p>Lodge open - 12th of July</p>
      </div>

      <Divider />
      <div
        id="bottom"
        className="text-dark-blue-100 flex flex-col gap-4 lg:justify-center"
      >
        <p>
          Once booking has been selected, please complete payment within 30
          minutes to confirm the booking.
        </p>
        <p>Please read UASC policy below before booking.</p>
        <h4>
          {/* TODO: REMOVE THIS PART AND CONNECT TO CMS */}
          Check in time: <strong>{CHECK_IN_TIME}</strong>
        </h4>
        <h4>
          {/* TODO: REMOVE THIS PART AND CONNECT TO CMS */}
          Check out time: <strong>{CHECK_OUT_TIME}</strong>
        </h4>
        <h4 className="text-red font-bold italic">
          You must have a booking to stay at the lodge!
        </h4>
        <Link href="/about" className="text-light-blue-100 font-bold italic">
          Learn about the lodge
        </Link>
      </div>
    </div>
  )
}

export default BookingInfoComponent

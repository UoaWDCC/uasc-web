import Link from "next/link"

type SuccessfulBookingProps = {
  startDate?: string
  endDate?: string
}

const SuccessfulBooking = ({ startDate, endDate }: SuccessfulBookingProps) => {
  return (
    <>
      <div className="border-gray-3 flex h-auto w-full flex-col items-start rounded-md border-2 bg-white px-8 py-2">
        <h3 className="text-dark-blue-100 xxs:mb-5 mb-10 mt-5 text-center font-bold">
          Your lodge booking has been confirmed!
        </h3>
        <h5 className="text-dark-blue-100 case-capital text-center font-bold uppercase">
          You have booked for:
        </h5>
        <h4 className="text-dark-blue-100 xxs:mb-5 mb-10 mt-1 text-center">
          {startDate} to {endDate}
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

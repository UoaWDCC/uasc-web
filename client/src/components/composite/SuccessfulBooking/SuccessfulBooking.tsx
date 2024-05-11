import FullPageBookLodgeImage from "components/generic/FullPageBookLodgeImage/FullPageBookLodgeImage"

type SuccessfulBookingProps = {
  startDate: string | null
  endDate: string | null
}

const SuccessfulBooking = ({ startDate, endDate }: SuccessfulBookingProps) => {
  return (
    <FullPageBookLodgeImage>
      <div className="text-dark-blue-100 mb-auto mr-auto mt-10 px-2 py-6 align-text-top italic md:ml-32 md:px-20 md:py-20">
        <h2>Book the Lodge</h2>
      </div>
      <div className="border-gray-3 xs:mb-80 xxs:mb-20 static mx-auto h-auto w-11/12 rounded-md border-2 bg-white py-5 md:w-6/12">
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
            <a href="/bookings">Back to Bookings</a>
          </button>
        </div>
      </div>
    </FullPageBookLodgeImage>
  )
}

export default SuccessfulBooking

import FullPageBookLodgeImage from "components/generic/FullPageBookLodgeImage/FullPageBookLodgeImage"

type SuccessfulBookingProps = {
  startDate: string
  endDate: string
}

const SuccessfulBooking = ({ startDate, endDate }: SuccessfulBookingProps) => {
  return (
    <FullPageBookLodgeImage>
      <div className="text-dark-blue-100 mb-auto mr-auto px-2 py-6 align-text-top italic md:ml-32 md:px-20 md:py-20">
        <h2>Book the Lodge</h2>
      </div>
      <div className=" xs:-top-72 relative mx-auto mb-48 h-auto w-10/12 rounded-sm border border-black bg-white px-2 py-2 md:w-6/12 lg:-mb-10">
        <h4 className="text-dark-blue-100 text-center font-bold">
          Your lodge booking has been confirmed!
        </h4>
        <h5 className="text-dark-blue-100 case-capital mt-5 text-center font-bold uppercase">
          You have booked for:
        </h5>
        <p className="text-dark-blue-100 mb-5 mt-1 text-center">
          {startDate} to {endDate}
        </p>
        <p className="text-dark-blue-100 mb-10 text-center">
          Please check your email for the confirmation.
        </p>
        <div className="mb-2 flex justify-center">
          <button className="text-dark-blue-100 border-dark-blue-100 hover:bg-dark-blue-100 rounded-md border bg-white p-2 text-xs font-bold hover:scale-105 hover:text-white">
            <a href="/bookings">Back to Bookings</a>
          </button>
        </div>
      </div>
    </FullPageBookLodgeImage>
  )
}

export default SuccessfulBooking

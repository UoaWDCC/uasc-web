interface IBookingInfoProps {
  pricePerNight: string
  priceSaturday: string
  priceNonMember: string
}

type props = IBookingInfoProps

const Divider = () => <span className="bg-dark-blue-100 m-8 h-[1px] w-3/4" />

const BookingInfoComponent = ({
  pricePerNight,
  priceSaturday,
  priceNonMember
}: props) => {
  return (
    <div className="border-gray-3 flex h-fit w-full flex-col rounded border pb-8 lg:items-center lg:justify-center">
      <div
        id="top"
        className="text-dark-blue-100 pr-4.5 flex flex-col gap-2 pl-8 pt-8"
      >
        <h3 className="flex gap-2">
          ${pricePerNight}
          <h3 className="font-normal">per night</h3>
        </h3>

        <h3 className="flex gap-2">
          ${priceSaturday}
          <h3 className="font-normal">a single Saturday</h3>
        </h3>
        <h3>
          <h3 className="flex gap-2">
            ${priceNonMember}
            <h3 className="font-normal">per non-member</h3>
          </h3>
          <h3 className="font-normal">guest, per night</h3>
        </h3>
      </div>
      <Divider />
      <div
        id="bottom"
        className="text-dark-blue-100 flex flex-col gap-4 pl-8 pr-5 lg:items-center lg:justify-center"
      >
        <p>
          Once booking has been selected, please complete payment within 20
          minutes to confirm the booking.
        </p>
        <p>Please read UASC policy below before booking.</p>
      </div>
    </div>
  )
}

export default BookingInfoComponent

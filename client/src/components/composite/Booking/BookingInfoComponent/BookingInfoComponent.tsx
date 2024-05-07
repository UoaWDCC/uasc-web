interface IBookingInfoProps {
  price1: string
  price2: string
  price3: string
}

type props = IBookingInfoProps

const Divider = () => (
  <span className="bg-dark-blue-100 m-8 h-[1px] w-[283px]" />
)

const BookingInfoComponent = ({ price1, price2, price3 }: props) => {
  return (
    <div className="border-gray-3 flex h-fit w-full flex-col items-center justify-center rounded border">
      <div
        id="top"
        className="text-dark-blue-100 flex flex-col gap-2 pr-12 pt-16"
      >
        <h3 className="flex gap-2">
          ${price1}
          <h3 className="font-normal">per night</h3>
        </h3>

        <h3 className="flex gap-2">
          ${price2}
          <h3 className="font-normal">a single Saturday</h3>
        </h3>
        <h3>
          <h3 className="flex gap-2">
            ${price3}
            <h3 className="font-normal">per non-member</h3>
          </h3>
          <h3 className="font-normal">guest, per night</h3>
        </h3>
      </div>
      <Divider />
      <div id="bottom" className="text-dark-blue-100 flex flex-col items-center justify-center gap-2 w-[300px]">
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

const Divider = () => (
  <span className="bg-dark-blue-100 m-8 h-[1px] w-[283px]" />
)

const BookingInfoComponent = () => {
  return (
    <div className="flex h-[474px] max-w-[347px] flex-col items-center border border-black">
      <div
        id="top"
        className="text-dark-blue-100 flex flex-col gap-2 pl-8 pr-8 pt-16"
      >
        <h3 className="flex gap-2">
          $40<h3 className="font-normal">per night</h3>
        </h3>

        <h3 className="flex gap-2">
          $60<h3 className="font-normal">a single Saturday</h3>
        </h3>

        <h3 className="flex gap-2">
          $60<h3 className="font-normal">per non-member guest, per night</h3>
        </h3>
      </div>
      <Divider />
      <div id="bottom" className="pl-8 pr-8 text-dark-blue-100 flex flex-col gap-4">
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

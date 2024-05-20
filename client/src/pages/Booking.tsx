import BookingForm from "components/composite/Bookings/BookingForm"
import { Typography, Stack } from "@mui/material"

const Booking = () => {
  return (
    <div>
      <Routes>
        <Route path="success" element={<BookingSuccess />} />
      </Routes>
    </div>
  )
}

export default Booking

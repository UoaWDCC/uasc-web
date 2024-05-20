import { Route, Routes } from "react-router-dom"
import BookingSuccess from "pages/BookingSuccess"

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

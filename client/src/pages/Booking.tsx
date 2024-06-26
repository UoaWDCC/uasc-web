import { ProtectedCreateBookingSection } from "components/composite/Booking/BookingCreation/ProtectedCreateBookingSection"
import { Route, Routes } from "react-router-dom"
import BookingSuccess from "./BookingSuccess"
import { Footer } from "components/generic/Footer/Footer"
import BookingPayment from "components/composite/Booking/BookingPayment/BookingPayment"
import { useContext } from "react"
import { BookingContext } from "components/composite/Booking/BookingContext"
import { useUserLoggedInCallback } from "hooks/useUserLoggedInCallback"

const Booking = () => {
  const { clientSecret, getExistingSession } = useContext(BookingContext)

  useUserLoggedInCallback(() => getExistingSession?.())

  return (
    <>
      <div
        className="bg-book-lodge-image relative z-10 flex min-h-[90vh] w-full
      flex-col items-center bg-cover bg-top bg-no-repeat py-8"
      >
        <div className="flex w-full max-w-[850px] flex-col items-center gap-8">
          <h2 className="text-dark-blue-100 self-start italic">
            Book the lodge
          </h2>
          <span className="w-full">
            <Routes>
              <Route index element={<ProtectedCreateBookingSection />} />
              <Route
                path="payment"
                element={<BookingPayment clientSecret={clientSecret} />}
              />
              <Route path="success" element={<BookingSuccess />} />
            </Routes>
          </span>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Booking

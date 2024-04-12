import AdminBookingDetails from "components/composite/AdminBookingDetails/AdminBookingDetails"
import SignUpForm from "components/composite/SignUpForm/SignUpForm"
import About from "pages/About"
import Admin from "pages/Admin"
import Booking from "pages/Booking"
import Checkout from "pages/Checkout"
import Contact from "pages/Contact"
import Events from "pages/Events"
import Home from "pages/Home"
import Login from "pages/Login"
import Profile from "pages/Profile"
import Register from "pages/Register/Register"
import Thanks from "pages/Thanks"
import { Route, Routes } from "react-router-dom"

export const AllRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="events" element={<Events />} />
      <Route path="contact" element={<Contact />} />
      <Route path="register/*" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="booking" element={<Booking />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin" element={<Admin />}>
        <Route path="bookings" element={<AdminBookingDetails />} />
      </Route>
      <Route path="thanks" element={<Thanks />} />
    </Route>
  </Routes>
)

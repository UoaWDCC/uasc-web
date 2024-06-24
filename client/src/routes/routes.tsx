import About from "pages/About"
import Admin from "pages/Admin/Admin"
import Booking from "pages/Booking"
import Contact from "pages/Contact"
import Events from "pages/Events"
import Login from "pages/Login/Login"
import Profile from "pages/Profile/Profile"
import Register from "pages/Register/Register"
import { Route, Routes } from "react-router-dom"
import NoMatch from "pages/404"
import { BookingContextProvider } from "components/composite/Booking/BookingContext"
import WrappedHomeComponent from "pages/Home/sections/utils/WrappedHomeComponent"
import Loader from "components/generic/SuspenseComponent/Loader"

export const AllRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<WrappedHomeComponent />} />
      <Route path="about" element={<Loader />} />
      <Route path="events" element={<Events />} />
      <Route path="contact" element={<Contact />} />
      <Route path="register/*" element={<Register />} />
      <Route path="login/*" element={<Login />} />
      <Route
        path="bookings/*"
        element={
          <BookingContextProvider>
            <Booking />
          </BookingContextProvider>
        }
      />
      <Route path="profile" element={<Profile />} />
      <Route path="admin/*" element={<Admin />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
)

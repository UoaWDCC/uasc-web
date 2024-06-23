import About from "pages/About"
import Contact from "pages/Contact"
import Events from "pages/Events"
import Login from "pages/Login/Login"
import Register from "pages/Register/Register"
import { Route, Routes } from "react-router-dom"
import NoMatch from "pages/404"
import { BookingContextProvider } from "components/composite/Booking/BookingContext"
import WrappedHomeComponent from "pages/Home/sections/utils/WrappedHomeComponent"
import { Suspense, lazy } from "react"

const AsyncAdmin = lazy(() => import("pages/Admin/Admin"))
const AsyncProfile = lazy(() => import("pages/Profile/Profile"))
const AsyncBookings = lazy(() => import("pages/Booking"))

export const AllRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<WrappedHomeComponent />} />
      <Route path="about" element={<About />} />
      <Route path="events" element={<Events />} />
      <Route path="contact" element={<Contact />} />
      <Route path="register/*" element={<Register />} />
      <Route path="login/*" element={<Login />} />
      <Route
        path="bookings/*"
        element={
          <Suspense>
            <BookingContextProvider>
              <AsyncBookings />
            </BookingContextProvider>
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense>
            <AsyncProfile />
          </Suspense>
        }
      />
      <Route
        path="admin/*"
        element={
          <Suspense>
            <AsyncAdmin />
          </Suspense>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
)

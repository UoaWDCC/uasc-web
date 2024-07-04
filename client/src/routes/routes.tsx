import About from "pages/About"
import { Route, Routes } from "react-router-dom"
import NoMatch from "pages/404"
import { BookingContextProvider } from "components/composite/Booking/BookingContext"
import WrappedHomeComponent from "pages/Home/sections/utils/WrappedHomeComponent"
import { Suspense, lazy } from "react"
import Loader from "components/generic/SuspenseComponent/Loader"

const AsyncBooking = lazy(() => import("pages/Booking"))
const AsyncAdmin = lazy(() => import("pages/Admin/Admin"))
const AsyncRegister = lazy(() => import("pages/Register/Register"))
const AsyncLogin = lazy(() => import("pages/Login/Login"))
const AsyncProfile = lazy(() => import("pages/Profile/Profile"))

export const AllRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<WrappedHomeComponent />} />
      <Route path="about" element={<About />} />
      <Route
        path="register/*"
        element={
          <Suspense fallback={<Loader />}>
            <AsyncRegister />
          </Suspense>
        }
      />
      <Route
        path="login/*"
        element={
          <Suspense fallback={<Loader />}>
            <AsyncLogin />
          </Suspense>
        }
      />
      <Route
        path="bookings/*"
        element={
          <BookingContextProvider>
            <Suspense fallback={<Loader />}>
              <AsyncBooking />
            </Suspense>
          </BookingContextProvider>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<Loader />}>
            <AsyncProfile />
          </Suspense>
        }
      />
      <Route
        path="admin/*"
        element={
          <Suspense fallback={<Loader />}>
            <AsyncAdmin />
          </Suspense>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
)

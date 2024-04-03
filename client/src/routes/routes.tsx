import AdminBookingDetails from "components/composite/AdminBookingDetails/AdminBookingDetails"
import About from "pages/About"
import Admin from "pages/Admin"
import Booking from "pages/Booking"
import Checkout from "pages/Checkout"
import Contact from "pages/Contact"
import Events from "pages/Events"
import Home from "pages/Home"
import Login from "pages/Login"
import Profile from "pages/Profile"
import Register from "pages/Register"
import Thanks from "pages/Thanks"
import { JSX } from "react"

export interface RouteProps {
  path: string
  element: JSX.Element
}

export const AllRoutes: RouteProps[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/events", element: <Events /> },
  { path: "/contact", element: <Contact /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/booking", element: <Booking /> },
  { path: "/profile", element: <Profile /> },
  { path: "/admin", element: <Admin /> },
  { path: "/thanks", element: <Thanks /> },
  { path: "/admin/bookings", element: <AdminBookingDetails /> }
]

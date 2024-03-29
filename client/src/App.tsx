import "App.css"
import Navbar from "components/composite/Navbar/Navbar"
import Home from "pages/Home"
import About from "pages/About"
import Register from "pages/Register"
import Login from "pages/Login"
import Events from "pages/Events"
import Contact from "pages/Contact"
import Checkout from "pages/Checkout"
import Booking from "pages/Booking"
import Profile from "pages/Profile"
import Admin from "pages/Admin"
import Thanks from "pages/Thanks"
import AdminBookingsDetailedView from "pages/AdminBookingsDetailedView"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import queryClient from "services/QueryClient"
import theme from "theme"
import { QueryClientProvider } from "@tanstack/react-query"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="h-screen">
          <ThemeProvider theme={theme}>
            <Router>
              <div className="h-full">
                <Navbar />
                <div className="content" style={{ height: "100%" }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/thanks" element={<Thanks />} />
                    <Route
                      path="/admin/bookings"
                      element={<AdminBookingsDetailedView />}
                    />
                  </Routes>
                </div>
              </div>
            </Router>
          </ThemeProvider>
        </div>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App

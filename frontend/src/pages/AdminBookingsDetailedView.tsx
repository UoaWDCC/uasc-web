import React, { useState } from "react"
import { Container, Paper, Typography } from "@mui/material"
import DetailedBookingsCalendar from "../components/AdminDetailedCalendar"
import BookingDetails from "../components/AdminBookingDetails"
import "../pages/Admin.css"

const AdminBookingsDetailedView = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [totalDays, setTotalDays] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 30% 30%, #81c7ebaa, #ffffff)",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          margin: "32px",
          marginTop: "75px",
          padding: " 32px",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h1"
          align="left"
          color="#474747"
          sx={{ fontWeight: "bold" }}
        >
          Booking Details
        </Typography>
        <Container maxWidth={false} disableGutters={true}>
          <Container
            maxWidth={false}
            disableGutters={true}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <DetailedBookingsCalendar
              setSelectedUser={setSelectedUser}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              setTotalDays={setTotalDays}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
            {showDetails ? (
              <BookingDetails
                selectedUser={selectedUser}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                totalDays={totalDays}
                setShowDetails={setShowDetails}
              />
            ) : (
              <div />
            )}
          </Container>
        </Container>
      </Paper>
    </div>
  )
}

export default AdminBookingsDetailedView

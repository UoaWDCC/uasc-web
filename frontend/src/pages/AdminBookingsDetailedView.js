import React, { useState } from "react";
import { Container, Divider, Paper, Typography  } from "@mui/material"
import DetailedBookingsCalendar from "../components/AdminDetailedCalendar";
import BookingDetails from "../components/AdminBookingDetails";

const AdminBookingsDetailedView = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [totalDays, setTotalDays] = useState(0)

    return (
        <div>
          <Paper
            elevation={2}
            sx={{
              margin: "32px",
              marginTop: "64px",
              padding: " 32px",
              backgroundColor: "#A8ADB0",
              borderRadius: "32px 0px 32px 0px",
            }}
          >
            <Typography variant="h3" align="left">
              {" "}
              ADMIN DASHBOARD{" "}
            </Typography>
            <Divider />
            <Container maxWidth={false} disableGutters={true}>
                <Container maxWidth={false} disableGutters={true} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <DetailedBookingsCalendar setSelectedUser={ setSelectedUser } setCheckInDate={ setCheckInDate } setCheckOutDate={ setCheckOutDate } setTotalDays={ setTotalDays }/>
                  <BookingDetails selectedUser={ selectedUser } checkInDate={ checkInDate } checkOutDate={ checkOutDate } totalDays={ totalDays }/>
                </Container>
            </Container>
          </Paper>
        </div>
      )
}

export default AdminBookingsDetailedView;
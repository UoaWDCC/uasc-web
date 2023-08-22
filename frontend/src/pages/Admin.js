import React, { useState } from "react"
import {
  Paper,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
} from "@mui/material"
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material"
import Requests from "../components/AdminRequests"
import RequestDetails from "../components/RequestDetails"
import "./Admin.css"

const Admin = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const [weekOffset, setWeekOffset] = useState(0)

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - startDate.getDay() + weekOffset * 7)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  // Fake dataset for now - will be replaced with API call
  const bookings = {
    SUN: ["User A"],
    MON: [],
    TUE: ["User A", "User B"],
    WED: ["User A", "User C", "User D"],
    THU: [],
    FRI: ["User A", "User B", "User C", "User D"],
    SAT: ["User C", "User D"],
  }

  const handleUserClick = (user) => {
    alert(`Clicked on ${user}`)
  }

  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "150%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 30% 30%, #81c7ebaa, #ffffff)",
      }}
    >
      <Stack spacing={3} sx={{ padding: "148px" }}>
        <Typography
          variant="h1"
          align="left"
          color="#474747"
          sx={{ fontWeight: "bold" }}
        >
          Admin Dashboard
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
          spacing={12}
        >
          <Requests setSelectedUser={setSelectedUser} />
          {selectedUser ? (
            <RequestDetails
              booking_id={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          ) : (
            <div className="bookings-section">
              <div className="bookings-header">
                <Typography variant="h4" align="left">
                  BOOKINGS
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="manage-bookings-button"
                >
                  Manage Bookings
                </Button>
              </div>
              <Paper
                elevation={2}
                sx={{
                  padding: "32px",
                  borderRadius: "16px",
                  background: "#D9D9D9",
                }}
                className="calendar-container"
              >
                <div className="container-header">
                  <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
                    <ArrowBackIos />
                  </IconButton>
                  <Typography
                    variant="h6"
                    paddingLeft="1rem"
                    className="date-range"
                  >
                    {startDate.toLocaleDateString()} -{" "}
                    {endDate.toLocaleDateString()}
                  </Typography>
                  <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
                    <ArrowForwardIos />
                  </IconButton>
                </div>
                <Grid container spacing={1}>
                  {daysOfWeek.map((day, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      md={12 / daysOfWeek.length}
                      className="day-container"
                    >
                      <Typography align="center" variant="h6">
                        {day}
                      </Typography>
                      <div className="user-buttons-container">
                        {bookings[day]?.length > 0 ? (
                          bookings[day].map((user, userIndex) => (
                            <Button
                              key={userIndex}
                              onClick={() => handleUserClick(user)}
                              className="user-button"
                            >
                              {user}
                            </Button>
                          ))
                        ) : (
                          <Typography variant="no-booking">
                            No bookings
                          </Typography>
                        )}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </div>
          )}
        </Stack>
      </Stack>
    </div>
  )
}

export default Admin

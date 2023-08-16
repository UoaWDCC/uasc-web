import React, { useState } from "react"
import {
  Paper,
  Divider,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
} from "@mui/material"
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material"
import Requests from "../components/AdminRequests"
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

  return (
    <div>
      <Paper
        elevation={2}
        sx={{
          margin: "0px 64px 64px 64px",
          padding: "32px",
          backgroundColor: "#A8ADB0",
          borderRadius: "32px 0px 32px 0px",
        }}
      >
        <Typography variant="h3" align="left">
          ADMIN DASHBOARD
        </Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Requests />
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
        </Stack>
      </Paper>
    </div>
  )
}

export default Admin

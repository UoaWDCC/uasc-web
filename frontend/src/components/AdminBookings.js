import {
  Paper,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
} from "@mui/material"
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material"
import "../pages/Admin.css"
import React, { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
// import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser"

const AdminBookings = () => {
  // const [ userMetadata] = useAuthenticatedUser()

  // // Check if the user is an admin before proceeding
  // if (userMetadata?.role !== "admin") {
  //   return <p>You do not have permission to view this page.</p>
  // }

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const [weekOffset, setWeekOffset] = useState(0)
  const [bookings, setBookings] = useState({
    SUN: [],
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
  })
  const [error, setError] = useState(null)

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - startDate.getDay() + weekOffset * 7)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingCol = collection(db, "bookings")
        const querySnapshot = await getDocs(bookingCol)

        const bookingsData = {
          SUN: [],
          MON: [],
          TUE: [],
          WED: [],
          THU: [],
          FRI: [],
          SAT: [],
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          const checkInDate = data.check_in.toDate()
          const dayOfWeek = daysOfWeek[checkInDate.getDay()]

          if (dayOfWeek && bookingsData[dayOfWeek]) {
            bookingsData[dayOfWeek].push({
              userId: data.user_id,
              checkIn: data.check_in.toDate(),
              checkOut: data.check_out.toDate(),
              // ... any other fields you want to retrieve
            })
          }
        })

        setBookings(bookingsData)
      } catch (error) {
        setError("Failed to fetch bookings. Please try again later.")
      }
    }

    fetchData()
  }, [weekOffset])

  const handleUserClick = (booking) => {
    alert(`User ID: ${booking.userId}
         Check-In Date: ${booking.checkIn.toLocaleDateString()}
         Check-Out Date: ${booking.checkOut.toLocaleDateString()}
         `)
  }

  if (error) {
    return <div>Error fetching data. Please try again later.</div>
  }

  return (
    <div style={{ width: "50%", backgroundColor: "transparent" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingTop: "20px" }}
      >
        <Typography
          variant="h3"
          align="left"
          color="#457CC3"
          sx={{ fontWeight: "900" }}
        >
          Bookings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="manage-bookings-button"
        >
          Manage Bookings
        </Button>
      </Stack>
      <Paper
        elevation={2}
        sx={{
          padding: "32px",
          borderRadius: "15px",
          background: "white",
          boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)",
          marginTop: "16px",
        }}
        className="calendar-container"
      >
        <Typography
          variant="h5"
          align="left"
          color="#457CC3"
          sx={{ fontWeight: "900" }}
        >
          Calendar Overview
        </Typography>
        <div className="container-header">
          <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" paddingLeft="1rem" className="date-range">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </Typography>
          <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
            <ArrowForwardIos />
          </IconButton>
        </div>
        <Grid container spacing={1}>
          {daysOfWeek.map((day, dayIndex) => (
            <Grid
              key={dayIndex} // This key should be sufficient for the days
              item
              xs={12}
              md={12 / daysOfWeek.length}
              className="day-container"
              sx={{
                backgroundColor: "common.grey",
              }}
            >
              <Typography align="center" variant="h6">
                {day}
              </Typography>
              <div className="user-buttons-container">
                {bookings[day]?.length > 0 ? (
                  bookings[day].map((booking, userIndex) => (
                    <Button
                      key={`${day}-${userIndex}`}
                      onClick={() => handleUserClick(booking)}
                      className="user-button"
                      sx={{ color: "primary.quaternary" }}
                    >
                      {booking.userId}
                    </Button>
                  ))
                ) : (
                  <Typography variant="no-booking">No bookings</Typography>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  )
}

export default AdminBookings

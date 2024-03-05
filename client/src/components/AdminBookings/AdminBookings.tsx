import {
  Paper,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton
} from "@mui/material"
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material"
import "pages/Admin.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "firebase"

const AdminBookings = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const [weekOffset, setWeekOffset] = useState(0)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState({
    SUN: [],
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: []
  })
  const [error, setError] = useState(null)

  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)
  startDate.setDate(startDate.getDate() - startDate.getDay() + weekOffset * 7)

  const endDate = new Date(startDate)
  endDate.setHours(0, 0, 0, 0)
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
          SAT: []
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          let checkInDate, checkOutDate

          if (data.check_in?.toDate) {
            checkInDate = data.check_in.toDate()
            checkInDate.setHours(0, 0, 0, 0)
            console.log(checkInDate + " 1")
          } else if (typeof data.check_in === "string") {
            const [day, month, year] = data.check_in.split("-")
            checkInDate = new Date(`${year}-${month}-${day}`)
            checkInDate.setHours(0, 0, 0, 0)
            console.log(checkInDate + " 2")
          }

          if (data.check_out?.toDate) {
            checkOutDate = data.check_out.toDate()
          } else if (typeof data.check_out === "string") {
            const [day, month, year] = data.check_out.split("-")
            checkOutDate = new Date(`${year}-${month}-${day}`)
          }

          if (checkInDate) {
            const dayOfWeek = daysOfWeek[checkInDate.getDay()]

            if (
              checkInDate >= startDate &&
              checkInDate <= endDate &&
              dayOfWeek &&
              // @ts-ignore
              bookingsData[dayOfWeek]
            ) {
              // @ts-ignore
              bookingsData[dayOfWeek].push({
                userId: data.user_id,
                checkIn: checkInDate,
                checkOut: checkOutDate
              })
            }
          }
        })

        setBookings(bookingsData)
      } catch (error) {
        // @ts-ignore
        setError("Failed to fetch bookings. Please try again later.")
        console.error("Error fetching bookings: ", error)
      }
    }

    fetchData()

    // This log will help you verify the date range:
    console.log("Checking range:", startDate, endDate)
  }, [weekOffset])

  const handleUserClick = (booking: any) => {
    alert(
      `User ID: ${booking.userId}
         Check-In Date: ${booking.checkIn.toLocaleDateString()}
         Check-Out Date: ${booking.checkOut.toLocaleDateString()}`
    )

    if (error) {
      return <div>Error fetching data. Please try again later.</div>
    }
  }

  const handleBookingsClick = () => {
    navigate("/admin/bookings")
  }

  return (
    <div className="bookings-section">
      <Stack direction="row" className="bookings-header">
        <Typography variant="h3" className="bookings-title">
          Bookings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="manage-bookings-button"
          onClick={() => handleBookingsClick()}
        >
          Manage Bookings
        </Button>
      </Stack>
      <Paper elevation={2} className="calendar-container">
        <Typography variant="h5" className="calendar-title">
          Calendar Overview
        </Typography>
        <div className="container-header">
          <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" className="date-range">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </Typography>
          <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
            <ArrowForwardIos />
          </IconButton>
        </div>
        <Grid container spacing={1}>
          {daysOfWeek.map((day, dayIndex) => (
            <Grid
              key={dayIndex}
              item
              xs={12}
              md={12 / daysOfWeek.length}
              className="day-container"
            >
              <Typography align="center" variant="h6">
                {day}
              </Typography>
              <div className="user-buttons-container">
                {/* @ts-ignore */}
                {bookings[day]?.map((booking: any, userIndex: number) => (
                  <Button
                    key={`${day}-${userIndex}`}
                    onClick={() => handleUserClick(booking)}
                    className="user-button"
                  >
                    {`Booking ${userIndex + 1}`}
                  </Button>
                ))}
                <Typography className="total-bookings">
                  {/* @ts-ignore */}
                  {`Total Bookings: ${bookings[day]?.length || 0}`}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  )
}

export default AdminBookings

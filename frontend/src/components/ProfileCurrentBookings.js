/* eslint-disable */

import {
  CardContent,
  Stack,
  Card,
  Typography,
  Button,
  Dialog,
  TextField,
} from "@mui/material"
import React, { useEffect } from "react"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { db } from "../firebase"
import { getDocs, collection, addDoc } from "firebase/firestore"

function SingularBookingDetails({ booking, onRequestChange, index }) {
  // console.log(booking.data())

  return (
    <Stack key={booking._uid} direction="row" justifyContent="space-between">
      <Typography variant="body1" align="left">
        {new Date(booking.data().check_in.seconds * 1000).toDateString()} to{" "}
        {new Date(booking.data().check_out.seconds * 1000).toDateString()}
      </Typography>
      <Button
        variant="contained"
        color="buttonPrimary"
        size="small"
        sx={{
          borderRadius: "100px",
          paddingX: "24px",
          textTransform: "none",
        }}
        onClick={() => onRequestChange(index)}
      >
        Request Change
      </Button>
    </Stack>
  )
}

function BookingRequestModal({ booking, open, handleClose, index }) {
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [newTotalDays, setNewTotalDays] = useState(0)
  const [requestMessage, setRequestMessage] = useState("")
  const bookingRequestCollectionRef = collection(db, "booking_requests")

  const handleChangeStartDate = (startDate) => {
    if (startDate >= checkOutDate) {
      setCheckOutDate(null)
    }
    const newCheckInDate = new Date(getFormattedDateString(startDate))
    setCheckInDate(dayjs(newCheckInDate)) // need to use dayjs because thats the MUI datepicker value type
  }

  const handleChangeEndDate = (endDate) => {
    const newCheckOutDate = new Date(getFormattedDateString(endDate))
    setCheckOutDate(dayjs(newCheckOutDate))
  }

  const isEndDateInvalid = (date) => {
    const endDate = new Date(getFormattedDateString(date))
    if (endDate <= checkInDate) {
      return true
    }
    return false
  }

  const isStartDateInvalid = (date) => {
    const startDate = new Date(getFormattedDateString(date))
    const currDate = new Date()

    if (startDate < currDate) {
      return true
    }

    return false
  }

  const getFormattedDateString = (date) => {
    return dayjs(date).format("YYYY-MM-DD")
  }

  //TODO Need to make this handle changes
  //TODO Need to change alerts to MUI alerts
  const handleRequestSubmit = async () => {
    if (checkInDate === null || checkOutDate === null) {
      alert("EMPTY FIELDS")
    } else if (
      newTotalDays !==
      Math.ceil(
        (new Date(booking.data().check_out.seconds) -
          new Date(booking.data().check_in.seconds)) /
          (3600 * 24)
      )
    ) {
      //Note: Current booking changes require the dates to be the same. This will be changed later to increase/decrease number of days.
      alert("TOTAL DAYS DO NOT MATCH")
    } else {
      try {
        const bookingRequest = {
          check_in: checkInDate,
          check_out: checkOutDate,
          query: requestMessage,
          query_type: "change",
          creation_time: new Date(),
          status: "unresolved",
          user_id: "/users/SomeUserId",
        }
        const docRef = await addDoc(bookingRequestCollectionRef, bookingRequest)

        console.log(docRef)
        console.log(docRef.id)

        if (docRef.id) {
          setTimeout(() => {
            console.log("Request submitted successfully")
            alert("Request submitted successfully")
          }, 3000)
          handleClose(index)
        }
      } catch (error) {
        setTimeout(() => {
          console.log(error)
          console.log("Request submission failed")
          alert("Request submission failed")
        }, 3000)
      }
    }
  }

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setNewTotalDays(checkOutDate.diff(checkInDate, "day"))
    }
  }, [checkInDate, checkOutDate])

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(index)}
      maxWidth="md"
      fullWidth={false}
      PaperProps={{ sx: { borderRadius: "15px" } }}
    >
      <Card sx={{ padding: "32px", width: "100%" }}>
        <CardContent sx={{ width: "100%" }}>
          <Stack spacing={4}>
            <Typography
              variant="h4"
              align="left"
              color="#474747"
              sx={{ fontWeight: "900" }}
            >
              Request Change
            </Typography>

            <Stack direction="row" justifyContent="space-between" spacing={12}>
              <Stack align="left" spacing={2}>
                <Typography variant="h6" color="#457CC3">
                  Current Booking details
                </Typography>
                <Stack direction="row">
                  <Typography
                    variant="body1"
                    color="#787B7D"
                    sx={{
                      minWidth: "200px",
                      maxWidth: "25%",
                    }}
                  >
                    Check-in Date:
                  </Typography>
                  <Typography variant="body1" color="#787B7D" sx={{}}>
                    {new Date(
                      booking.data().check_in.seconds * 1000
                    ).toLocaleDateString("en-GB")}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="body1"
                    color="#787B7D"
                    sx={{
                      minWidth: "200px",
                      maxWidth: "25%",
                    }}
                  >
                    Check-out Date:
                  </Typography>
                  <Typography variant="body1" color="#787B7D" sx={{}}>
                    {new Date(
                      booking.data().check_out.seconds * 1000
                    ).toLocaleDateString("en-GB")}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="body1"
                    color="#787B7D"
                    sx={{
                      minWidth: "200px",
                      maxWidth: "25%",
                    }}
                  >
                    Total Days:
                  </Typography>
                  <Typography variant="body1" color="#787B7D" sx={{}}>
                    {Math.ceil(
                      (new Date(booking.data().check_out.seconds) -
                        new Date(booking.data().check_in.seconds)) /
                        (3600 * 24)
                    )}
                  </Typography>
                </Stack>
              </Stack>
              <Stack align="left" spacing={2}>
                <Typography variant="h6" color="#457CC3">
                  Request Details
                </Typography>
                <Stack direction="row">
                  <Typography
                    variant="body1"
                    sx={{
                      minWidth: "200px",
                      maxWidth: "25%",
                    }}
                  >
                    Check-in Date:
                  </Typography>
                  {/* <Typography variant="body1">05/07/2023</Typography> */}
                  <DatePicker
                    value={checkInDate}
                    onChange={handleChangeStartDate}
                    shouldDisableDate={isStartDateInvalid}
                    label="New Check-in Date"
                    slotProps={{ textField: { size: "small" } }}
                  />
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="body1"
                    sx={{
                      minWidth: "200px",
                      maxWidth: "25%",
                    }}
                  >
                    Check-out Date:
                  </Typography>
                  {/* <Typography variant="body1">07/07/2023</Typography> */}
                  <DatePicker
                    value={checkOutDate}
                    onChange={handleChangeEndDate}
                    shouldDisableDate={isEndDateInvalid}
                    label="New Check-out Date"
                    slotProps={{ textField: { size: "small" } }}
                  />
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="body1"
                    sx={{
                      minWidth: "200px",
                      maxWidth: "25%",
                    }}
                  >
                    Total Days:
                  </Typography>
                  <Typography variant="body1">{newTotalDays}</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Typography variant="h6" color="#457CC3">
              Request Message:
            </Typography>
            <TextField
              variant="standard"
              multiline
              rows={6}
              placeholder="Enter your message here..."
              onChange={(e) => setRequestMessage(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
              style={{
                width: "100%",
                background: "#EDF8FF",
                "&:hover": {
                  borderColor: "transparent",
                },
                borderRadius: "15px",
              }}
            />
            <Stack justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                color="buttonPrimary"
                size="small"
                sx={{
                  borderRadius: "100px",
                  paddingX: "24px",
                  textTransform: "none",
                  width: "fit-content",
                }}
                onClick={handleRequestSubmit}
              >
                {" "}
                Request Change{" "}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Dialog>
  )
}

function ProfileCurrentBookings({ bookings }) {
  const bookingsLength = bookings ? bookings.length : 0
  const [open, setOpen] = useState([])

  const handleOpen = (pos) => {
    const newOpen = open.slice()
    newOpen[pos] = true
    setOpen(newOpen)
  }

  const handleClose = (pos) => {
    const newOpen = open.slice()
    newOpen[pos] = false
    setOpen(newOpen)
  }

  useEffect(() => {
    setOpen([...Array(bookingsLength).fill(false)])
    console.log("Open array: ", open)
  }, [])

  return (
    <div>
      <Card
        sx={{
          boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        <CardContent sx={{ padding: "36px" }}>
          <Stack spacing={4}>
            <Typography
              variant="h5"
              align="left"
              color="#457CC3"
              sx={{ fontWeight: "900" }}
            >
              Current Bookings
            </Typography>
            {!bookings ? (
              "Retrieving bookings..."
            ) : (
              <Stack spacing={2}>
                {bookings.map((booking, index) => (
                  <>
                    <SingularBookingDetails
                      key={booking.id}
                      booking={booking}
                      onRequestChange={handleOpen}
                      index={index}
                    />
                    <BookingRequestModal
                      key={booking.id}
                      booking={booking}
                      open={open[index]}
                      handleClose={handleClose}
                      index={index}
                    />
                  </>
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCurrentBookings

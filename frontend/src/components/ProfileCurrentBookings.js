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

function SingularBookingDetails({ booking, onRequestChange }) {
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
        onClick={onRequestChange}
      >
        Request Change
      </Button>
    </Stack>
  )
}

function BookingRequestModal({
  booking,
  open,
  handleClose,
  handleRequestSubmit,
}) {
  console.log(
    Math.ceil(
      (new Date(booking.data().check_out.seconds) -
        new Date(booking.data().check_in.seconds)) /
        (3600 * 24)
    )
  )

  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [newTotalDays, setNewTotalDays] = useState(0)

  //TODO: REVIEW THIS SECTION OF CODE FROM MITCHELL"S BOOKING FORM
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

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      console.log("Both checkin and checkout dates are valid")
      console.log(checkOutDate.diff(checkInDate, "day"))
      setNewTotalDays(checkOutDate.diff(checkInDate, "day"))
    } else {
      console.log("One of the dates is invalid")
    }
  }, [checkInDate, checkOutDate])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //TODO Need to make this handle changes
  const handleRequestSubmit = () => {
    console.log("Request submitted")
    setOpen(false)
  }

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
                {bookings.map((booking) => (
                  <>
                    <SingularBookingDetails
                      key={booking.id}
                      booking={booking}
                      onRequestChange={handleOpen}
                    />
                    <BookingRequestModal
                      key={booking.id}
                      booking={booking}
                      open={open}
                      handleClose={handleClose}
                      handleRequestSubmit={handleRequestSubmit}
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

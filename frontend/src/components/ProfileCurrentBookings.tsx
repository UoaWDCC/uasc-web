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
import dayjs, { Dayjs } from "dayjs"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

/**
 * Displays a single booking to be inserted into a Stack.
 * @param {{ booking: Booking, onRequestChange: React.MouseEventHandler<HTMLAnchorElement>}}
 * @returns
 */
function SingularBookingDetails({ booking, onRequestChange, index }: any) {
  return (
    <Stack key={booking._uid} direction="row" justifyContent="space-between">
      <Typography variant="body1" align="left">
        {new Date(booking.data().check_in.toDate()).toDateString()}
        {" to "}
        {new Date(booking.data().check_out.toDate()).toDateString()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
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

function BookingRequestModal({ booking, open, handleClose, index }: any) {
  const [checkInDate, setCheckInDate] = useState<any | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<any | null>(null)
  const [newTotalDays, setNewTotalDays] = useState(0)
  const [requestMessage, setRequestMessage] = useState("")
  const bookingRequestCollectionRef = collection(db, "requests")

  const handleChangeStartDate = (startDate: any) => {
    if (!checkOutDate) return
    if (startDate >= checkOutDate) {
      setCheckOutDate(null)
    }
    const newCheckInDate = new Date(getFormattedDateString(startDate))
    setCheckInDate(dayjs(newCheckInDate)) // need to use dayjs because thats the MUI datepicker value type
  }

  const handleChangeEndDate = (endDate: any) => {
    const newCheckOutDate = new Date(getFormattedDateString(endDate))
    setCheckOutDate(dayjs(newCheckOutDate))
  }

  const isEndDateInvalid = (date: any) => {
    if (!checkInDate) return
    const endDate = dayjs(new Date(getFormattedDateString(date)))
    if (endDate <= checkInDate) {
      return true
    }
    return false
  }

  const isStartDateInvalid = (date: any) => {
    const startDate = new Date(getFormattedDateString(date))
    const currDate = new Date()

    if (startDate < currDate) {
      return true
    }

    return false
  }

  const getFormattedDateString = (date: any) => {
    return dayjs(date).format("YYYY-MM-DD")
  }

  //TODO Need to make this handle changes
  //TODO Need to change alerts to MUI alerts
  const handleRequestSubmit = async () => {
    if (checkInDate === null || checkOutDate === null) {
      alert("EMPTY FIELDS")
    } else if (
      newTotalDays !==
      // @ts-ignore
      Math.ceil(
        // @ts-ignore
        (new Date(booking.data().check_out.seconds) -
          // @ts-ignore
          new Date(booking.data().check_in.seconds)) /
          (3600 * 24)
      )
    ) {
      //Note: Current booking changes require the dates to be the same. This will be changed later to increase/decrease number of days.
      alert("TOTAL DAYS DO NOT MATCH")
    } else {
      try {
        const newCheckInFormatted = checkInDate.toDate()
        const newCheckOutFormatted = checkOutDate.toDate()
        const oldCheckInFormatted = new Date(
          booking.data().check_in.seconds * 1000
        )
        const oldCheckOutFormatted = new Date(
          booking.data().check_out.seconds * 1000
        )

        const bookingRequest = {
          user_id: booking.data().user_id,
          booking_id: booking.id,
          query: requestMessage,
          query_type: "dateChange",
          status: "unresolved",
          creation_time: new Date(),
          new_check_in: newCheckInFormatted,
          new_check_out: newCheckOutFormatted,
          old_check_in: oldCheckInFormatted,
          old_check_out: oldCheckOutFormatted,
        }
        const docRef = await addDoc(bookingRequestCollectionRef, bookingRequest)

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
              {/* @ts-ignore */}
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
                      // @ts-ignore
                      (new Date(booking.data().check_out.seconds) -
                        // @ts-ignore
                        new Date(booking.data().check_in.seconds)) /
                        (3600 * 24)
                    )}
                  </Typography>
                </Stack>
              </Stack>
              {/* @ts-ignore */}
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
                    // @ts-ignore
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
                // @ts-ignore
                "&:hover": {
                  borderColor: "transparent",
                },
                borderRadius: "15px",
              }}
            />
            <Stack justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                color="primary"
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

/**
 * Renders the current bookings the user has.
 * @param {{bookings: Array<Booking> | undefined}} bookings The current user bookings.
 * @returns
 */
export default function ProfileCurrentBookings({ bookings }: any) {
  const bookingsLength = bookings ? bookings.length : 0
  const [open, setOpen] = useState([])

  const handleOpen = (pos: any) => {
    const newOpen = open.slice()
    // @ts-ignore
    newOpen[pos] = true
    setOpen(newOpen)
  }

  const handleClose = (pos: any) => {
    const newOpen = open.slice()
    // @ts-ignore
    newOpen[pos] = false
    setOpen(newOpen)
  }

  useEffect(() => {
    // @ts-ignore
    setOpen([...Array(bookingsLength).fill(false)])
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
            ) : bookings.length === 0 ? (
              "You have no bookings currently."
            ) : (
              <Stack spacing={2}>
                {bookings.map((booking: any, index: number) => (
                  <React.Fragment key={booking.id}>
                    <SingularBookingDetails
                      key={`${booking.id}-details`}
                      booking={booking}
                      onRequestChange={handleOpen}
                      index={index}
                    />
                    <BookingRequestModal
                      key={`${booking.id}-modal`}
                      booking={booking}
                      open={open[index] ?? false}
                      handleClose={handleClose}
                      index={index}
                    />
                  </React.Fragment>
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

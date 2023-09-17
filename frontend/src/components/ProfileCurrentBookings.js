import {
  CardContent,
  Stack,
  Card,
  Typography,
  Button,
  Dialog,
  TextField,
} from "@mui/material"
import React from "react"
import { useState } from "react"

/**
 * Displays a single booking to be inserted into a Stack.
 * @param {{ booking: Booking, onRequestChange: React.MouseEventHandler<HTMLAnchorElement>}}
 * @returns
 */
function SingularBookingDetails({ booking, onRequestChange }) {
  return (
    <Stack key={booking._uid} direction="row" justifyContent="space-between">
      <Typography variant="body1" align="left">
        {new Date(booking.data().check_in.toDate()).toDateString()} to{" "}
        {new Date(booking.data().check_out.toDate()).toDateString()}
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

/**
 * Renders the current bookings the user has.
 * @param {{bookings: Array<Booking> | undefined}} bookings The current user bookings.
 * @returns
 */
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
            ) : bookings.length === 0 ? (
              "You have no bookings currently."
            ) : (
              <Stack spacing={2}>
                {bookings.map((booking) => (
                  <SingularBookingDetails
                    key={booking.id}
                    booking={booking}
                    onRequestChange={handleOpen}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* edit details dialog */}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={12}
              >
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
                      05/07/2023
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
                      07/07/2023
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
                      3
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
                    <Typography variant="body1">05/07/2023</Typography>
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
                    <Typography variant="body1">07/07/2023</Typography>
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
                    <Typography variant="body1">3</Typography>
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
                  Request Change
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  )
}

export default ProfileCurrentBookings

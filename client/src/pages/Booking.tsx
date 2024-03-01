import React from "react"
import BookingForm from "components/BookingForm"
import { Typography, Stack } from "@mui/material"

const Booking = () => {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 25% 50%, #81c7ebaa, #ffffff)"
      }}
    >
      <Stack spacing={3} sx={{ padding: "148px" }}>
        <Typography
          variant="h1"
          align="left"
          color="#474747"
          sx={{ fontWeight: "bold" }}
        >
          Bookings
        </Typography>
        <BookingForm />
      </Stack>
    </div>
  )
}

export default Booking

import { CardContent, Stack, Card, Typography, Button } from "@mui/material"
import React from "react"

function ProfileCurrentBookings() {
  const mockCurrentBookingData = [
    {
      check_in: "Feb 5th 2023",
      check_out: "Feb 7th 2023",
      total_days: 3,
      booking_id: 0,
    },
    {
      check_in: "Mar 12th 2023",
      check_out: "Mar 13th 2023",
      total_days: 2,
      booking_id: 1,
    },
    {
      check_in: "Jul 5th 2023",
      check_out: "Jul 7th 2023",
      total_days: 3,
      booking_id: 2,
    },
  ]

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
              Current Bookings{" "}
            </Typography>
            <Stack spacing={2}>
              {mockCurrentBookingData.map((booking) => (
                <Stack
                  key={booking.booking_id}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" align="left">
                    {" "}
                    {booking.check_in} - {booking.check_out}{" "}
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
                  >
                    {" "}
                    Request Change{" "}
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCurrentBookings

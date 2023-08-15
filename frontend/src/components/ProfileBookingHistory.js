import React from "react"
import { CardContent, Stack, Card, Typography } from "@mui/material"

function ProfileBookingHistory() {
  const mockBookingHistoryData = [
    {
      check_in: "Jan 1st 2021",
      check_out: "Jan 4th 2021",
      total_days: 4,
      booking_id: 0,
    },
    {
      check_in: "Aug 21st 2021",
      check_out: "Aug 22nd 2021",
      total_days: 2,
      booking_id: 1,
    },
    {
      check_in: "Sep 25th 2022",
      check_out: "Sep 26th 2022",
      total_days: 2,
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
            <Typography variant="h6" align="left">
              Booking History{" "}
            </Typography>
            <Stack spacing={2}>
              {mockBookingHistoryData.map((booking) => (
                <Stack
                  key={booking.booking_id}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" align="left">
                    {" "}
                    {booking.check_in} - {booking.check_out}{" "}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileBookingHistory

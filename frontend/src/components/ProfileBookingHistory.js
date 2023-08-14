import React from "react"
import { CardContent, Stack, Card, Typography } from "@mui/material"

function ProfileBookingHistory() {
  const mockBookingData = [0, 1, 2]
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
              {mockBookingData.map((booking) => (
                <Stack
                  key={booking}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" align="left">
                    {" "}
                    Booking {booking}{" "}
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

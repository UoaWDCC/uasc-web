import { Card, Typography, CardContent, Stack, Box } from "@mui/material"
import React from "react"
import { DateCalendar } from "@mui/x-date-pickers"

function ProfileCalendarCard() {
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
          <Stack spacing={2}>
            <Typography
              variant="h5"
              align="left"
              color="#457CC3"
              sx={{ fontWeight: "900" }}
            >
              Calendar{" "}
            </Typography>
            <Box sx={{}}>
              <DateCalendar />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCalendarCard

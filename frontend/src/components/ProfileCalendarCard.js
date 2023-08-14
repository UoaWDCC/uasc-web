import { CardContent, Stack } from "@mui/material"
import React from "react"

import { Card, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { DateCalendar } from "@mui/x-date-pickers"

function ProfileCalendarCard() {
  return (
    <div>
      <Card
        sx={{
          boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)",
          backgroundColor: "white",
        }}
      >
        <CardContent sx={{ padding: "36px" }}>
          <Stack spacing={2}>
            <Typography variant="h6" align="left">
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

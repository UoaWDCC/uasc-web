import React, { useState } from "react"
import { Paper, Divider, Box, Typography, Stack } from "@mui/material"
import Requests from "../components/AdminRequests"
import Bookings from "../components/AdminBookings"
import RequestDetails from "../components/RequestDetails"

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div>
      <Paper
        elevation={2}
        sx={{
          margin: "32px",
          marginTop: "64px",
          padding: " 32px",
          backgroundColor: "#A8ADB0",
          borderRadius: "32px 0px 32px 0px",
        }}
      >
        <Box marginLeft="32px" marginRight="32px">
          <Typography variant="h3" align="left">
            {" "}
            ADMIN DASHBOARD{" "}
          </Typography>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Requests setSelectedUser={setSelectedUser} />
            {selectedUser ? (
              <RequestDetails
                booking_id={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            ) : (
              <Bookings />
            )}
          </Stack>
        </Box>
      </Paper>
    </div>
  )
}

export default Admin

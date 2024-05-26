import { useState } from "react"
import { Typography, Stack } from "@mui/material"
import Requests from "components/composite/AdminRequests/AdminRequests"
import RequestDetails from "components/composite/RequestDetails/RequestDetails"

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 30% 30%, #81c7ebaa, #ffffff)"
      }}
    >
      <Stack spacing={3} sx={{ padding: "148px" }}>
        <Typography
          variant="h1"
          align="left"
          color="#474747"
          sx={{ fontWeight: "bold" }}
        >
          Admin Dashboard
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
          spacing={12}
        >
          <Requests setSelectedUser={setSelectedUser} />
          {selectedUser ? (
            <RequestDetails
              booking_id={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          ) : null}
        </Stack>
      </Stack>
    </div>
  )
}

export default Admin

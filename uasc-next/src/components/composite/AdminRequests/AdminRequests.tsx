import { Grid, Typography, Paper } from "@mui/material"
import RequestBlock from "./RequestBlock/RequestBlock"
import { useState, useEffect } from "react"

const AdminDashboardRequest = ({ setSelectedUser }: any) => {
  const gridItemStyle = {
    requestBackground: {
      borderRadius: 15, // Change the value as needed
      backgroundColor: "white", // Change the background color as needed
      padding: "20px", // Add padding as needed
      boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)"
    }
  }

  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    // eventually, we make this actually ask for the requests from firebase
    // for now, simulate waiting 1 second and then return some dummy data
    setTimeout(() => {
      setRequests([
        {
          user_id: "User 1",
          booking_id: "User-1-Booking-1",
          query: "I'd like to change my booking.",
          query_type: "dateChange",
          status: "unresolved"
        },
        {
          user_id: "User 2",
          booking_id: "User-2-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "dateChange",
          status: "unresolved"
        },
        {
          user_id: "User 3",
          booking_id: "User-3-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved"
        },
        {
          user_id: "User 2",
          booking_id: "User-2-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "dateChange",
          status: "unresolved"
        },
        {
          user_id: "User 3",
          booking_id: "User-3-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved"
        },
        {
          user_id: "User 2",
          booking_id: "User-2-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "dateChange",
          status: "unresolved"
        },
        {
          user_id: "User 3",
          booking_id: "User-3-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved"
        },
        {
          user_id: "User 2",
          booking_id: "User-2-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "dateChange",
          status: "unresolved"
        },
        {
          user_id: "User 3",
          booking_id: "User-3-Booking-1",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved"
        }
      ])
    }, 1000)
  }, [])

  // now use requests to display the data

  return (
    <div style={{ width: "50%" }}>
      <Grid container rowSpacing={2} paddingTop="20px" sx={{ width: "100%" }}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            align="left"
            color="#457CC3"
            sx={{ fontWeight: "900" }}
          >
            Requests
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={0} style={gridItemStyle.requestBackground}>
            <Grid
              sx={{
                overflowY: "auto ",
                // overflow: "hidden",
                height: "600px",
                maxHeight: "600px"
              }}
            >
              {requests.map((request: any) => (
                <RequestBlock
                  key={request.booking_id}
                  requestData={request}
                  setSelectedUser={setSelectedUser}
                />
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default AdminDashboardRequest

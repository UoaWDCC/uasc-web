import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Stack
} from "@mui/material"

const ProfileBookingHistory = ({ bookings }: any) => {
  // Filter out bookings that have check-out dates in the past.
  const pastBookings =
    bookings?.filter(
      (booking: any) => booking.data().check_out.toDate() < new Date()
    ) || []

  return (
    <Card
      sx={{
        boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)",
        backgroundColor: "white",
        borderRadius: "15px"
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
            Booking History
          </Typography>
          {pastBookings.length === 0 ? (
            <Typography variant="body1" align="left">
              {" "}
              You have no past bookings.{" "}
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Check In</TableCell>
                    <TableCell align="right">Check Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastBookings.map((booking: any) => (
                    <TableRow key={booking.id}>
                      <TableCell align="right">
                        {new Date(
                          booking.data().check_in.seconds * 1000
                        ).toLocaleDateString("en-GB") || "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(
                          booking.data().check_out.seconds * 1000
                        ).toLocaleDateString("en-GB") || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ProfileBookingHistory

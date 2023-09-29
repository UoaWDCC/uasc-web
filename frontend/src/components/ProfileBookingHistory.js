import React, { useState, useEffect } from "react"
import { db } from "../firebase"
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
  Stack,
} from "@mui/material"
import {
  doc,
  collection,
  where,
  query,
  orderBy,
  getDocs,
} from "@firebase/firestore"

const ProfileBookingHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    setLoading(true)

    const fetchData = async () => {
      try {
        const userDocRef = doc(db, "users", userId)
        const q = query(
          collection(db, "bookings"),
          where("user_id", "==", userDocRef),
          orderBy("check_in", "desc")
        )

        const querySnapshot = await getDocs(q)

        const fetchedBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setBookings(fetchedBookings)
      } catch (error) {
        console.error("Error fetching user bookings: ", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return (
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
            Booking History
          </Typography>
          {loading ? (
            <Typography variant="body1" align="left">
              {" "}
              Loading...{" "}
            </Typography>
          ) : bookings.length === 0 ? (
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
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell align="right">
                        {new Date(
                          booking.check_in.seconds * 1000
                        ).toLocaleDateString("en-GB") || "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(
                          booking.check_out.seconds * 1000
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

import { db } from "../firebase"
import React, { useEffect, useState } from "react"
import { getDocs, where, query, collection, doc } from "firebase/firestore"
import { Stack, Typography } from "@mui/material"
import "../styles/Profile.css"
import ProfileCard from "../components/ProfileCard"
import ProfileCalendarCard from "../components/ProfileCalendarCard"
import ProfileCurrentBookings from "../components/ProfileCurrentBookings"
import ProfileBookingHistory from "../components/ProfileBookingHistory"
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser"

/**
 * Reference to a booking from the Firestore.
 * @typedef {{ data(): { user_id: string, check_in: require("firebase/firestore").Timestamp, check_out: require("firebase/firestore").Timestamp } }} Booking
 */

export default function Profile() {
  const [user, userMetadata] = useAuthenticatedUser()
  /**
   * @type {[Array<Booking>, React.Dispatch<Array<Booking>>]}
   */
  const [bookings, setBookings] = useState(undefined)

  /**
   * Retrieves the current user bookings from firestore.
   * @param {string} userId
   */
  const getBookings = (userId) => {
    getDocs(
      query(
        collection(db, "bookings"),
        where("user_id", "==", doc(db, "users", userId))
      )
    )
      .then((storeBookings) => {
        setBookings(storeBookings.docs)
      })
      .catch((err) =>
        console.error(
          `Failed to retrieve bookings for authenticated user: ${err}`
        )
      )
  }

  useEffect(() => {
    if (user) {
      getBookings(user.uid)
    }
  }, [user, userMetadata])

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 30% 30%, #81c7ebaa, #ffffff)",
      }}
    >
      <Stack spacing={3} sx={{ padding: "148px" }}>
        <Typography
          variant="h1"
          align="left"
          color="#474747"
          sx={{ fontWeight: "bold" }}
        >
          Profile
        </Typography>
        <Stack direction="row" spacing={12} justifyContent="space-between">
          <ProfileCard />
          <Stack spacing={3} sx={{ width: "100%" }}>
            <Typography
              variant="h3"
              align="left"
              color="#457CC3"
              sx={{ fontWeight: "900" }}
            >
              My Bookings
            </Typography>
            <ProfileCalendarCard bookings={bookings} />
            <ProfileCurrentBookings bookings={bookings} />
            {user && <ProfileBookingHistory userId={user.uid} />}
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}

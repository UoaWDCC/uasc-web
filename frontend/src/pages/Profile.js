import { db } from "../firebase"
import React, { useEffect, useState } from "react"
import { getDocs, where, query, collection } from "firebase/firestore"
import { Stack, Typography } from "@mui/material"
import "../styles/Profile.css"
import ProfileCard from "../components/ProfileCard"
import ProfileCalendarCard from "../components/ProfileCalendarCard"
import ProfileCurrentBookings from "../components/ProfileCurrentBookings"
import ProfileBookingHistory from "../components/ProfileBookingHistory"
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser"

const Profile = () => {
  const [user, userMetadata] = useAuthenticatedUser()
  const [bookings, setBookings] = useState(undefined)

  useEffect(() => {
    if (user) {
      getBookings(user.uid)
    }
  }, [user, userMetadata])

  // todo: early return if we aren't logged in (i.e., user === undefined)

  // Retrieve current bookings from firebase
  const getBookings = (userId) => {
    getDocs(query(collection(db, "bookings"), where("user_id", "==", userId)))
      .then((bookings) => {
        setBookings(bookings.docs)
      })
      .catch(console.error)
  }

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "150%",
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
            <ProfileCalendarCard />
            {<ProfileCurrentBookings bookings={bookings} />}
            <ProfileBookingHistory />
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}

export default Profile

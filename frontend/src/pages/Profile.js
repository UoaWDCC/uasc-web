/* eslint-disable */

import { DateCalendar } from "@mui/x-date-pickers"
import { db } from "../firebase"
import React, { useEffect, useState } from "react"
import { getDocs, where, query, collection } from "firebase/firestore"
import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material"
import "../styles/Profile.css"
import ProfileCard from "../components/ProfileCard"
import ProfileCalendarCard from "../components/ProfileCalendarCard"
import ProfileCurrentBookings from "../components/ProfileCurrentBookings"
import ProfileBookingHistory from "../components/ProfileBookingHistory"

const Profile = () => {
  // const [userData, setUserData] = useState(null)
  const [expanded, setExpanded] = useState(false)
  // const [bookings, setBookings] = useState(null)

  useEffect(() => {
    // getUserData()
    getBookings()
  }, [])

  //Expanding the more details on the user page
  const expandDetails = () => {
    setExpanded(!expanded)
  }

  //Getting the bookings from the firebase database
  const q = query(
    collection(db, "bookings"),
    where("user_id", "==", "8mYj7rWOMH6hGy4FzMed")
  )

  const getBookings = () => {
    console.log("Getting the bookings")
    getDocs(q)
      .then((doc) => {
        console.log(doc)
        // setBookings(doc.data())
        // console.log(bookings)
      })
      .catch(console.error)
    // getDoc(doc(db, "bookings"), where("user_id", "==", userData.id))
    // .then((doc) => {
    //   setBookings(doc.data())
    //   console.log(bookings)
    // })
    // .catch(console.error)
  }

  //Getting the user data from the firebase database
  // const getUserData = () => {
  //   getDoc(doc(db, "users", "lVsOjAp06AfD6atT8bnrVEpcdcg2"))
  //     .then((doc) => {
  //       if (doc.exists()) {
  //         setUserData(doc.data())
  //         console.log("User data:")
  //         console.log(userData)
  //       } else {
  //         console.log("Doc does not exist")
  //       }
  //     })
  //     .catch(console.error)
  // }

  return (
    // <div className="profilePage">
    //   <h1>Profile page</h1>
    //   <div className="profileSection">
    //     <div className="userSection">
    //       <div>
    //         <h2>NAME</h2>
    //         <p>John Doe</p>
    //       </div>
    //       <div className="userInfo">
    //         <h1>USER INFO</h1>
    //         <hr></hr>
    //         <h2 className="">EMAIL</h2>
    //         <p>JohnDoe@gmail.com</p>
    //         <h2>MEMBERSHIP</h2>
    //         <p>UoA Student</p>
    //         <h2>OTHER DETAILS</h2>
    //       </div>
    //     </div>
    //     <div className="bookingSection">
    //       <h1>BOOKINGS</h1>
    //       <hr></hr>
    //       <DateCalendar />
    //       <h1>BOOKING HISTORY</h1>
    //       <hr></hr>
    //       <p>JAN 1ST - JAN 3RD</p>
    //       <p>JAN 5TH - JAN 7TH</p>
    //     </div>
    //   </div>
    // </div>
    // <div>
    //   <h1>Profile Page here</h1>
    //   <Stack direction="row">
    //     <Paper
    //       elevation={3}
    //       variant="outlined"
    //       sx={{
    //         margin: "32px 0px 32px 32px",
    //         padding: "32px",
    //         borderRadius: "100px 0px 0px 100px",
    //         width: "100%",
    //       }}
    //     >
    //       <Stack
    //         direction="row"
    //         alignItems="start"
    //         justifyContent="space-evenly"
    //       >
    //         <Stack alignItems="inherit" sx={{ minWidth: "640px" }}>
    //           <Stack direction="row" alignItems="center">
    //             <Avatar sx={{ width: "64px", height: "64px" }} />
    //             <Stack
    //               justifyItems="start"
    //               justifyContent="start"
    //               alignItems="start"
    //             >
    //               <h2>NAME</h2>
    //               <h1>NAME PLACEHOLDER</h1>
    //             </Stack>
    //           </Stack>

    //           <Stack alignItems="inherit" sx={{ width: "100%" }}>
    //             <h1>USER INFO</h1>
    //             <Divider />
    //             <h2>EMAIL</h2>
    //             <h1>EMAIL PLACEHOLDER</h1>
    //             <h2>MEMBERSHIP</h2>
    //             <h1>MEMBERSHIP PLACEHOLDER</h1>
    //           </Stack>
    //           <Stack alignItems="inherit" sx={{ width: "100%" }}>
    //             <Stack
    //               direction="row"
    //               justifyContent="space-between"
    //               sx={{ width: "100%" }}
    //             >
    //               <h2>OTHER DETAILS</h2>
    //               <h2 onClick={expandDetails}>
    //                 {/* TODO: NEED TO MAKE THIS TEXT MORE OBVIOUS */}
    //                 {expanded ? "HIDE" : "EXPAND"}
    //               </h2>
    //             </Stack>
    //             <Divider />
    //             {expanded ? (
    //               <Stack alignItems="inherit">
    //                 <h2>Expanded details here</h2>
    //                 <Stack alignItems="inherit">
    //                   <h2>MEMBERSHIP</h2>
    //                   <h1>MEMBERSHIP PLACEHOLDER</h1>

    //                   <h2>MEMBERSHIP</h2>
    //                   <h1>MEMBERSHIP PLACEHOLDER</h1>

    //                   <h2>MEMBERSHIP</h2>
    //                   <h1>MEMBERSHIP PLACEHOLDER</h1>
    //                 </Stack>
    //               </Stack>
    //             ) : (
    //               <h2>NOTHING SHOWN</h2>
    //             )}
    //           </Stack>
    //         </Stack>
    //         <Paper
    //           elevation={3}
    //           sx={{
    //             margin: "32px 0px 32px 32px",
    //             padding: "32px",
    //             borderRadius: "100px 0px 0px 100px",
    //             backgroundColor: "#717171",
    //             minWidth: "640px",
    //             height: "100%",
    //           }}
    //         >
    //           <Stack alignItems="start" sx={{ width: "100%" }}>
    //             <Stack alignItems="inherit" sx={{ width: "100%" }}>
    //               <h1>BOOKINGS</h1>
    //               <Divider />
    //               <DateCalendar />
    //               <h2>Some bookings here</h2>
    //             </Stack>
    //             <Stack alignItems="inherit" sx={{ width: "100%" }}>
    //               <h1>BOOKING HISTORY</h1>
    //               <Divider />
    //               <h2>JAN 1ST - JAN 3RD</h2>
    //               <h2>JAN 9TH - JAN 12ND</h2>
    //             </Stack>
    //           </Stack>
    //         </Paper>
    //       </Stack>
    //     </Paper>
    //   </Stack>
    <div>
      <Stack spacing={3} sx={{ padding: "148px" }}>
        <Typography variant="h1" align="left" color="#474747">
          Profile
        </Typography>
        <Stack direction="row" spacing={6}>
          <ProfileCard />
          <Stack spacing={3}>
            <Typography variant="h3" align="left" color="#457CC3">
              My Bookings
            </Typography>
            <ProfileCalendarCard />
            <ProfileCurrentBookings />
            <ProfileBookingHistory />
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}

export default Profile

import { DateCalendar } from "@mui/x-date-pickers"
import { db } from "../firebase"
import React, { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"
import { Avatar, Divider, Paper, Stack } from "@mui/material"
import "../styles/Profile.css"

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    getDoc(doc(db, "users", "lVsOjAp06AfD6atT8bnrVEpcdcg2"))
      .then((doc) => {
        if (doc.exists()) {
          setUserData(doc.data())
          console.log(userData)
        } else {
          console.log("Doc does not exist")
        }
      })
      .catch(console.error)
  }, [])

  const expandDetails = () => {
    //Need to create func later
    console.log("Expanding details")
    setExpanded(!expanded)
  }

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
    <div>
      <h1>Profile Page here</h1>
      <Stack direction="row">
        <Paper
          elevation={3}
          variant="outlined"
          sx={{
            margin: "32px 0px 32px 32px",
            padding: "32px",
            borderRadius: "100px 0px 0px 100px",
            width: "100%",
          }}
        >
          <Stack direction="row">
            <Stack alignItems="start">
              <Stack direction="row" alignItems="center">
                <Avatar sx={{ width: "64px", height: "64px" }} />
                <Stack
                  justifyItems="start"
                  justifyContent="start"
                  alignItems="start"
                >
                  <h2>NAME</h2>
                  <h1>ACTUAL NAME PLACEHOLDER</h1>
                </Stack>
              </Stack>

              <Stack sx={{ width: "100%" }}>
                <h2>USER INFO</h2>
                <Divider />
                <h2>EMAIL</h2>
                <h2>ACTUAL EMAIL PLACEHOLDER</h2>
                <h2>MEMBERSHIP</h2>
                <h2>ACTUAL MEMBERSHIP PLACEHOLDER</h2>
              </Stack>
              <Stack sx={{ width: "100%" }}>
                <Stack direction="row" justifyContent="space-between">
                  <h2>OTHER DETAILS</h2>
                  <h2 onClick={expandDetails}>EXPAND</h2>
                </Stack>
                <Divider />
                <h2>MORE DETS</h2>
                {expanded ? (
                  <h2>Expanded details here</h2>
                ) : (
                  <div>
                    {" "}
                    <h2>NOT EXPANDED</h2> <DateCalendar />{" "}
                  </div>
                )}
              </Stack>
            </Stack>
            <Paper
              elevation={3}
              variant="outlined"
              sx={{
                margin: "32px 0px 32px 32px",
                padding: "32px",
                borderRadius: "100px 0px 0px 100px",
                backgroundColor: "#717171",
                height: "100%",
              }}
            >
              <Stack>
                <h1>BOOKINGS</h1>
                <Divider />
                <DateCalendar />
                <h2>Some bookings here</h2>
              </Stack>
              <Stack>
                <h1>BOOKING HISTORY</h1>
                <Divider />
                <h2>JAN 1ST - JAN 3RD</h2>
                <h2>JAN 9TH - JAN 12ND</h2>
              </Stack>
            </Paper>
          </Stack>
        </Paper>
      </Stack>
    </div>
  )
}

export default Profile

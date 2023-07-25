import { DateCalendar } from "@mui/x-date-pickers"
import { db } from "../firebase"
import React, { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"
import "../styles/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    getDoc(doc(db, "users", "lVsOjAp06AfD6atT8bnrVEpcdcg2"))
      .then((doc) => {
        if (doc.exists()) {
          setUserData(doc.data())
        } else {
          console.log("Doc does not exist")
        }
      })
      .catch(console.error)
  }, [])

  return (
    <div className="profilePage">
      <h1>Profile page</h1>
      <div className="profileSection">
        <div className="userSection">
          <div>
            <h2>NAME</h2>
            <p>John Doe</p>
          </div>
          <div className="userInfo">
            <h1>USER INFO</h1>
            <hr></hr>
            <h2 className="">EMAIL</h2>
            <p>JohnDoe@gmail.com</p>
            <h2>MEMBERSHIP</h2>
            <p>UoA Student</p>
            <h2>OTHER DETAILS</h2>
          </div>
        </div>
        <div className="bookingSection">
          <h1>BOOKINGS</h1>
          <hr></hr>
          <DateCalendar />
          <h1>BOOKING HISTORY</h1>
          <hr></hr>
          <p>JAN 1ST - JAN 3RD</p>
          <p>JAN 5TH - JAN 7TH</p>
        </div>
      </div>
    </div>
  )
}

export default Profile

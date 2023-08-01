import { DateCalendar } from "@mui/x-date-pickers"
import { db } from "../firebase"
import React, { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"

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
    <div>
      <h1>Profile page</h1>
      {userData && (
        <div>
          <h2>
            Name: {userData.first_name} {userData.last_name}
          </h2>
          <h2>Email: {userData.email}</h2>
          <h2>Membership Type: {userData.membership}</h2>
        </div>
      )}
      <div>
        <h2>Current Bookings</h2>
        <DateCalendar />
      </div>
    </div>
  )
}

export default Profile

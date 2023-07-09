import { DateCalendar } from "@mui/x-date-pickers";
import "../styles/Profile.css";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "users", "lVsOjAp06AfD6atT8bnrVEpcdcg2"))
      .then((doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        } else {
          console.log("Doc does not exist");
        }
      })
      .catch(console.error);
  }, []);

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
            <h2>EMAIL</h2>
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
        </div>
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
  );
};

export default Profile;

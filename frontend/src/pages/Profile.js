import { DateCalendar } from "@mui/x-date-pickers";
import "../styles/Profile.css";

const Profile = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Profile;

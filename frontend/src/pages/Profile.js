import { DateCalendar } from "@mui/x-date-pickers";

const Profile = () => {
  return (
    <div>
      <h1>Profile page</h1>
      <div>
        <h2>Name</h2>
        <h2>Email</h2>
        <h2>Membership Type</h2>
      </div>
      <div>
        <h2>Current Bookings</h2>
        <DateCalendar />
      </div>
    </div>
  );
};

export default Profile;

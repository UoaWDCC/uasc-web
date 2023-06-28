import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Profile;

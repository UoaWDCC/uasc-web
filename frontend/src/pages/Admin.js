import { Paper, Divider, Typography, Stack } from "@mui/material";
import Requests from "../components/AdminRequests";
import Bookings from "../components/AdminBookings";

const Admin = () => {
  return (
    <div>
      <Paper
        elevation={2}
        sx={{
          margin: "32px",
          marginTop: "64px",
          padding: " 32px",
          backgroundColor: "#A8ADB0",
          borderRadius: "32px 0px 32px 0px",
        }}
      >
        <Typography variant="h3" align="left">
          {" "}
          ADMIN DASHBOARD{" "}
        </Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Requests />
          <Bookings />
        </Stack>
      </Paper>
    </div>
  );
};

export default Admin;

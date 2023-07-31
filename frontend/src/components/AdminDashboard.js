import React from "react";
import { Typography, Paper, Grid, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const AdminDashboard = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const bookings = ["Booking 1", "Booking 2"]; // placeholder for the bookings for now

  return (
    <Grid container direction="column" padding="2rem">
      <Grid item>
        <Typography variant="h4" align="left" style={{ paddingTop: "2rem" }}>
          ADMIN DASHBOARD
        </Typography>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" padding="2rem">
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Typography variant="h6" align="center">
              REQUESTS
            </Typography>
            <Typography align="center">Requests Placeholder</Typography>
            <Button variant="contained" color="primary">
              View Request History
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Typography variant="h6" align="center">
              BOOKINGS
            </Typography>
            <Grid container>
              {daysOfWeek.map((day, index) => (
                <StyledGrid key={index} item xs>
                  <Typography>{day}</Typography>
                  {bookings.map((booking, i) => (
                    <Typography key={i}>{booking}</Typography>
                  ))}
                </StyledGrid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;

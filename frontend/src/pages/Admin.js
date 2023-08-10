// Admin.js

import React from "react";
import { Paper, Divider, Typography, Stack, Button, Grid } from "@mui/material";
import Requests from "../components/AdminRequests";
import './Admin.css'; // Import the CSS file

const Admin = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const handleUserClick = (user) => {
    // Placeholder for click
    alert(`Clicked on ${user}`);
  };

  return (
    <div>
      <Paper
        elevation={2}
        sx={{
          margin: "32px",
          marginTop: "64px",
          padding: "32px",
          backgroundColor: "#A8ADB0",
          borderRadius: "32px 0px 32px 0px",
        }}
      >
        <Typography variant="h3" align="left">ADMIN DASHBOARD</Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Requests />
          <div className="bookings-section">
            <div className="bookings-header">
              <Typography variant="h4" align="left">BOOKINGS</Typography>
              <Button variant="contained" color="primary" className="manage-bookings-button">
                Manage Bookings
              </Button>
            </div>
            <Paper elevation={2} sx={{ padding: "32px", borderRadius: "16px", background: "#D9D9D9" }} className="calendar-container">
              <div className="container-header">
                <Typography variant="subtitle1" paddingLeft="1rem">
                  {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </Typography>
              </div>
              <Grid container spacing={1}>
                {daysOfWeek.map((day, index) => (
                  <Grid key={index} item xs={12} md={12 / daysOfWeek.length} className="day-container">
                    <Typography align="center">{day}</Typography>
                    <div className="user-buttons-container">
                      <Button onClick={() => handleUserClick("User A")} className="user-button">User A</Button>
                      <Button onClick={() => handleUserClick("User B")} className="user-button">User B</Button>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Paper> 
          </div>
        </Stack>
      </Paper>
    </div>
  );
};

export default Admin;

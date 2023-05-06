import React from "react";
import { Typography, Paper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { makeStyles } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  bookedDate: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1),
    borderRadius: "50%",
  },
}));

const Booking = ({ bookings }) => {
  const classes = useStyles();

  // Custom date highlighting logic
  const highlightBookedDates = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return bookings.includes(dateString);
  };

  return (
    <div style={{ display: "flex" }}>
      <Paper elevation={3} className={classes.calendarContainer}>
        <Typography variant="h6">Event Bookings</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderDay={(date, selectedDate, isInCurrentMonth, dayComponent) => {
              const isBooked = highlightBookedDates(date);
              const dayClassName = isBooked ? classes.bookedDate : "";
              return <div className={dayClassName}>{dayComponent}</div>;
            }}
          />
        </LocalizationProvider>
        <Typography variant="caption">Booked dates are highlighted</Typography>
      </Paper>
    </div>
  );
};

export default Booking;

import React, { useState } from "react";
import { FormControl, FormLabel, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BookingForm = () => {
  const [bookingDate, setBookingDate] = useState(dayjs(Date.now()));

  const bookedDates = ["2023-05-15", "2023-05-20", "2023-05-25"];

  const handleBookingDateChange = (date) => {
    setBookingDate(date);
  };

  const isDateBooked = (date) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    return bookedDates.includes(dateString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", bookingDate.$d);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl style={{ margin: "1.5rem" }}>
        <FormLabel style={{ textAlign: "left" }}>Book a Date</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={bookingDate}
            onChange={handleBookingDateChange}
            shouldDisableDate={isDateBooked}
            disablePast
          />
        </LocalizationProvider>
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "1.5rem" }}
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default BookingForm;

import React, { useState } from "react";
import { FormControl, FormLabel, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BookingForm = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs(Date.now()));
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs(Date.now()));

  // dummy data to test
  const existingBookedDateRanges = [
    { start: "2023-05-21", end: "2023-05-23" },
    { start: "2023-05-26", end: "2023-05-27" },
    { start: "2023-05-29", end: "2023-05-31" },
  ];

  const isDateWithinBookedRange = (dateToCheck) => {
    for (const existingBookedRange of existingBookedDateRanges) {
      const existingStart = new Date(existingBookedRange.start);
      const existingEnd = new Date(existingBookedRange.end);

      if (dateToCheck >= existingStart && dateToCheck <= existingEnd) {
        return true;
      }
    }
    return false;
  };

  const doesEndDateIncludeExistingDateRange = (newEndDate) => {
    for (const existingBookedRange of existingBookedDateRanges) {
      const existingStart = new Date(existingBookedRange.start);
      const existingEnd = new Date(existingBookedRange.end);

      if (selectedStartDate <= existingStart && newEndDate >= existingEnd) {
        return true;
      }
    }
    return false;
  };

  const isStartDateInvalid = (date) => {
    const startDateString = dayjs(date).format("YYYY-MM-DD"); // needed to convert using dayjs otherwise disabled dates would be 1 day ahead
    const startDate = new Date(startDateString);
    return isDateWithinBookedRange(startDate);
  };

  const isEndDateInvalid = (date) => {
    const endDateString = dayjs(date).format("YYYY-MM-DD");
    const endDate = new Date(endDateString);

    if (endDate < selectedStartDate) {
      return true;
    }

    return (
      isDateWithinBookedRange(endDate) ||
      doesEndDateIncludeExistingDateRange(endDate)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Selected Date Range:\n${selectedStartDate.$d} - \n${selectedEndDate.$d}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl style={{ margin: "1.5rem" }}>
        <FormLabel style={{ textAlign: "left" }}>Select a Start Date</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedStartDate}
            onChange={(newStartDate) => setSelectedStartDate(newStartDate)}
            shouldDisableDate={isStartDateInvalid}
            disablePast
          />
        </LocalizationProvider>
        <FormLabel style={{ textAlign: "left", marginTop: "1rem" }}>
          Select an End Date
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedEndDate}
            onChange={(newEndDate) => setSelectedEndDate(newEndDate)}
            shouldDisableDate={isEndDateInvalid}
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

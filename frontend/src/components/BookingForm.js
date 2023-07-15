import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { db } from "../firebase";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";

const BookingForm = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs(Date.now()));
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [existingBookings, setExistingBookings] = useState([]);
  const [dateAvailability, setDateAvailability] = useState(new Map());
  const bookingCollectionRef = collection(db, "bookings");
  const maxSpotsAvailable = 50;

  const addBookingForTest = async () => {
    await addDoc(bookingCollectionRef, {
      checkIn: "Sat Jul 15 2023 12:00:00 GMT+1200 (New Zealand Standard Time)",
      checkOut: "Sat Jul 22 2023 12:00:00 GMT+1200 (New Zealand Standard Time)",
      uid: "/users/jZBNOl0e7mWPNgTuTEwcED2RniG3",
    });
  };

  const deleteBookingForTest = async () => {
    const ids = [];
    for (const id of ids) {
      const docRef = doc(db, "bookings", id);
      await deleteDoc(docRef);
    }
  };

  // fetch bookings on component mount
  useEffect(() => {
    retrieveExistingBookings();
  }, []);

  // build hashmap of booked spot availability once existingBookings state has been set
  useEffect(() => {
    setSpotAvailabilityByDate();
  }, [existingBookings]);

  // testing log
  useEffect(() => {
    console.log(existingBookings);
    console.log(dateAvailability);
  }, [dateAvailability]);

  const retrieveExistingBookings = async () => {
    const querySnapshot = await getDocs(bookingCollectionRef);
    let bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setExistingBookings(bookings);
  };

  const setSpotAvailabilityByDate = () => {
    const availability = new Map();

    existingBookings.forEach((booking) => {
      const dateRange = getDateRangeArray(booking.checkIn, booking.checkOut);
      dateRange.forEach((date) => {
        const dateKey = date.toDateString();
        const spotsTaken = (availability.get(dateKey) || 0) + 1;
        availability.set(dateKey, spotsTaken);
      });
    });

    setDateAvailability(availability);
  };

  const getDateRangeArray = (checkIn, checkOut) => {
    let dates = [];
    let currDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    while (currDate < endDate) {
      dates.push(new Date(currDate.getTime()));
      currDate.setDate(currDate.getDate() + 1);
    }

    return dates;
  };

  const existingBookedDateRanges = [
    { start: "2023-07-21", end: "2023-07-23" },
    { start: "2023-07-26", end: "2023-07-27" },
    { start: "2023-07-29", end: "2023-07-31" },
  ];

  const isDateWithinExistingBookedDates = (dateToCheck) => {
    for (const existingBookedRange of existingBookedDateRanges) {
      const existingStart = new Date(existingBookedRange.start);
      const existingEnd = new Date(existingBookedRange.end);

      if (dateToCheck >= existingStart && dateToCheck <= existingEnd) {
        return true;
      }
    }
    return false;
  };

  const doesEndDateIncludeExistingBookedDates = (newEndDate) => {
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
    return isDateWithinExistingBookedDates(startDate);
  };

  const isEndDateInvalid = (date) => {
    const endDateString = dayjs(date).format("YYYY-MM-DD");
    const endDate = new Date(endDateString);

    if (endDate < selectedStartDate) {
      return true;
    }

    return (
      isDateWithinExistingBookedDates(endDate) ||
      doesEndDateIncludeExistingBookedDates(endDate)
    );
  };

  const handleChangeStartDate = (startDate) => {
    if (startDate > selectedEndDate) {
      setSelectedEndDate(null);
    }
    setSelectedStartDate(startDate);
  };

  const handleChangeEndDate = (endDate) => {
    setSelectedEndDate(endDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEndDate) {
      alert("Please select an end date before submitting"); // will replace with mui modal or something later
      return;
    }

    console.log(
      `Selected Date Range:\n${selectedStartDate.$d} - \n${selectedEndDate.$d}`
    );
    // need to add booking to firestore
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl style={{ margin: "1.5rem" }}>
        <FormLabel style={{ textAlign: "left" }}>Select a Start Date</FormLabel>
        <DatePicker
          value={selectedStartDate}
          onChange={handleChangeStartDate}
          shouldDisableDate={isStartDateInvalid}
          disablePast
          disableHighlightToday
        />
        <FormLabel style={{ textAlign: "left", marginTop: "1rem" }}>
          Select an End Date
        </FormLabel>
        <DatePicker
          value={selectedEndDate}
          onChange={handleChangeEndDate}
          shouldDisableDate={isEndDateInvalid}
          disablePast
          disableHighlightToday
        />
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

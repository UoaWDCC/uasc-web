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
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [existingBookings, setExistingBookings] = useState([]);
  const [dateAvailabilities, setDateAvailabilities] = useState(new Map());
  const bookingCollectionRef = collection(db, "bookings");
  const maxSpotsAvailablePerDay = 50;

  const addBookingForTest = async () => {
    await addDoc(bookingCollectionRef, {
      checkIn: "Tue Aug 01 2023 12:00:00 GMT+1200 (New Zealand Standard Time)",
      checkOut: "Tue Aug 08 2023 12:00:00 GMT+1200 (New Zealand Standard Time)",
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
    // addBookingForTest();
    retrieveExistingBookings();
  }, []);

  // build hashmap of booked spot availability once existingBookings state has been set
  useEffect(() => {
    setSpotAvailabilityByDate();
  }, [existingBookings]);

  // useEffect(() => {
  //   console.log("bookings", existingBookings);
  //   console.log("spots", dateAvailabilities);
  // }, [dateAvailabilities]);

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
    let availabilities = new Map();
    existingBookings.forEach((booking) => {
      const dateRange = getDateRangeArray(booking.checkIn, booking.checkOut);
      dateRange.forEach((date) => {
        const dateKey = date.toDateString();
        const spotsTaken = (availabilities.get(dateKey) || 0) + 1;
        availabilities.set(dateKey, spotsTaken);
      });
    });
    setDateAvailabilities(availabilities);
  };

  const getDateRangeArray = (checkIn, checkOut) => {
    let dates = [];
    let currDate = new Date(formatDateString(checkIn));
    const endDate = new Date(formatDateString(checkOut));

    while (currDate < endDate) {
      dates.push(new Date(currDate.getTime()));
      currDate.setDate(currDate.getDate() + 1);
    }

    return dates;
  };

  const isStartDateInvalid = (date) => {
    const startDate = new Date(formatDateString(date));
    return isDateBookedOut(startDate);
  };

  const isEndDateInvalid = (date) => {
    const endDate = new Date(formatDateString(date));
    if (endDate <= selectedStartDate) {
      return true;
    }

    const dateRange = getDateRangeArray(selectedStartDate, endDate);
    dateRange.forEach((date) => {
      if (isDateBookedOut(date)) {
        return true;
      }
    });

    return false;
  };

  const isDateBookedOut = (dateToCheck) => {
    const spotsTaken = dateAvailabilities.get(dateToCheck.toDateString()) || 0;
    const spotsLeft = maxSpotsAvailablePerDay - spotsTaken;
    if (spotsLeft <= 0) {
      return true;
    }

    return false;
  };

  const handleChangeStartDate = (startDate) => {
    if (startDate >= selectedEndDate) {
      setSelectedEndDate(null);
    }
    const selectedDate = dayjs(formatDateString(startDate));
    setSelectedStartDate(selectedDate);
  };

  const handleChangeEndDate = (endDate) => {
    const selectedDate = dayjs(formatDateString(endDate));
    setSelectedEndDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEndDate) {
      alert("Please select an end date before submitting"); // will replace with mui modal or something later
      return;
    }
    console.log(
      `Selected Date Range:\n${selectedStartDate} - \n${selectedEndDate}`
    );
    // need to add booking to firestore
  };

  const formatDateString = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
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

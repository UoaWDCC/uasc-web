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

  // fetch bookings on component mount
  useEffect(() => {
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
      let currDate = new Date(getFormattedDateString(booking.checkIn));
      const endDate = new Date(getFormattedDateString(booking.checkOut));

      while (currDate < endDate) {
        const dateKey = currDate.toDateString();
        const spotsTaken = (availabilities.get(dateKey) || 0) + 1;
        availabilities.set(dateKey, spotsTaken);

        currDate.setDate(currDate.getDate() + 1);
      }
    });

    setDateAvailabilities(availabilities);
  };

  const isDateBookedOut = (dateToCheck) => {
    const dateKey = dateToCheck.toDateString();
    const spotsTaken = dateAvailabilities.get(dateKey) || 0;
    const spotsLeft = maxSpotsAvailablePerDay - spotsTaken;
    if (spotsLeft <= 0) {
      return true;
    }

    return false;
  };

  const isStartDateInvalid = (date) => {
    const startDate = new Date(getFormattedDateString(date));
    return isDateBookedOut(startDate);
  };

  const isEndDateInvalid = (date) => {
    const endDate = new Date(getFormattedDateString(date));
    if (endDate <= selectedStartDate) {
      return true;
    }

    let currDate = new Date(selectedStartDate);
    while (currDate <= endDate) {
      if (isDateBookedOut(currDate)) {
        return true;
      }
      currDate.setDate(currDate.getDate() + 1);
    }

    return false;
  };

  const handleChangeStartDate = (startDate) => {
    if (startDate >= selectedEndDate) {
      setSelectedEndDate(null);
    }
    const selectedDate = new Date(getFormattedDateString(startDate));
    setSelectedStartDate(dayjs(selectedDate)); // need to use dayjs because
  };

  const handleChangeEndDate = (endDate) => {
    const selectedDate = new Date(getFormattedDateString(endDate));
    setSelectedEndDate(dayjs(selectedDate));
  };

  const getFormattedDateString = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
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

  return (
    <form onSubmit={handleSubmit}>
      <FormControl style={{ margin: "1.5rem" }}>
        <FormLabel style={{ textAlign: "left" }}>
          Select a Check-In Date
        </FormLabel>
        <DatePicker
          value={selectedStartDate}
          onChange={handleChangeStartDate}
          shouldDisableDate={isStartDateInvalid}
          disablePast
          disableHighlightToday
        />
        <FormLabel style={{ textAlign: "left", marginTop: "1rem" }}>
          Select a Check-Out Date
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

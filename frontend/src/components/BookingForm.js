import React, { useState } from "react"
import { FormControl, FormLabel, Button } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"

const BookingForm = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs(Date.now()))
  const [selectedEndDate, setSelectedEndDate] = useState(null)

  // dummy data to test, kinda just assuming that the booking documents
  // in firestore will contain a start and end property
  const existingBookedDateRanges = [
    { start: "2023-07-21", end: "2023-07-23" },
    { start: "2023-07-26", end: "2023-07-27" },
    { start: "2023-07-29", end: "2023-07-31" },
  ]

  const isDateWithinExistingBookedDates = (dateToCheck) => {
    for (const existingBookedRange of existingBookedDateRanges) {
      const existingStart = new Date(existingBookedRange.start)
      const existingEnd = new Date(existingBookedRange.end)

      if (dateToCheck >= existingStart && dateToCheck <= existingEnd) {
        return true
      }
    }
    return false
  }

  const doesEndDateIncludeExistingBookedDates = (newEndDate) => {
    for (const existingBookedRange of existingBookedDateRanges) {
      const existingStart = new Date(existingBookedRange.start)
      const existingEnd = new Date(existingBookedRange.end)

      if (selectedStartDate <= existingStart && newEndDate >= existingEnd) {
        return true
      }
    }
    return false
  }

  const isStartDateInvalid = (date) => {
    const startDateString = dayjs(date).format("YYYY-MM-DD") // needed to convert using dayjs otherwise disabled dates would be 1 day ahead
    const startDate = new Date(startDateString)
    return isDateWithinExistingBookedDates(startDate)
  }

  const isEndDateInvalid = (date) => {
    const endDateString = dayjs(date).format("YYYY-MM-DD")
    const endDate = new Date(endDateString)

    if (endDate < selectedStartDate) {
      return true
    }

    return (
      isDateWithinExistingBookedDates(endDate) ||
      doesEndDateIncludeExistingBookedDates(endDate)
    )
  }

  const handleChangeStartDate = (startDate) => {
    if (startDate > selectedEndDate) {
      setSelectedEndDate(null)
    }
    setSelectedStartDate(startDate)
  }

  const handleChangeEndDate = (endDate) => {
    setSelectedEndDate(endDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedEndDate) {
      alert("Please select an end date before submitting") // will replace with mui modal or something later
      return
    }

    console.log(
      `Selected Date Range:\n${selectedStartDate.$d} - \n${selectedEndDate.$d}`
    )
    // need to add booking to firestore
  }

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
  )
}

export default BookingForm

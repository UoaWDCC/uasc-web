import React, { useEffect, useState } from "react"
import { Alert, FormControl, FormLabel, Button } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { db } from "../firebase"
import { getDocs, collection, addDoc } from "firebase/firestore"
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser"

const BookingForm = () => {
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(null)
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(null)

  const [existingBookings, setExistingBookings] = useState([])
  const [dateAvailabilities, setDateAvailabilities] = useState(new Map())
  const [dateRange, setDateRange] = useState([])

  const bookingCollectionRef = collection(db, "bookings")
  const maxSpotsAvailablePerDay = 50

  const [bookingSuccessful, setBookingSuccessful] = useState(false)
  const [bookingErrorMessage, setBookingErrorMessage] = useState("")

  const [user, userMetadata] = useAuthenticatedUser()
  const [userData, setUserData] = useState(undefined)

  // fetch bookings on component mount
  useEffect(() => {
    retrieveExistingBookings()
  }, [])

  // build hashmap of booked spot availability once existingBookings state has been set
  useEffect(() => {
    setSpotAvailabilityByDate()
  }, [existingBookings])

  useEffect(() => {
    setEarliestDefaultCheckInDate()
  }, [dateAvailabilities])

  useEffect(() => {
    setDateRange(getDateRangeArray())
  }, [selectedCheckInDate, selectedCheckOutDate])

  useEffect(() => {
    setUserData(userMetadata)
  }, [user, userMetadata])

  const retrieveExistingBookings = async () => {
    const querySnapshot = await getDocs(bookingCollectionRef)
    let bookings = []
    querySnapshot.forEach((doc) => {
      bookings.push({
        ...doc.data(),
        id: doc.id,
      })
    })
    setExistingBookings(bookings)
  }

  const setSpotAvailabilityByDate = () => {
    let availabilities = new Map()

    existingBookings.forEach((booking) => {
      let currDate = new Date(getFormattedDateString(booking.check_in))
      const endDate = new Date(getFormattedDateString(booking.check_out))

      while (currDate < endDate) {
        const dateKey = currDate.toDateString()
        const spotsTaken = (availabilities.get(dateKey) || 0) + 1
        availabilities.set(dateKey, spotsTaken)

        currDate.setDate(currDate.getDate() + 1)
      }
    })

    setDateAvailabilities(availabilities)
  }

  const isDateBookedOut = (dateToCheck) => {
    const dateKey = dateToCheck.toDateString()
    const spotsTaken = dateAvailabilities.get(dateKey) || 0
    const spotsLeft = maxSpotsAvailablePerDay - spotsTaken
    if (spotsLeft <= 0) {
      return true
    }

    return false
  }

  const isStartDateInvalid = (date) => {
    const startDate = new Date(getFormattedDateString(date))
    return isDateBookedOut(startDate)
  }

  const isEndDateInvalid = (date) => {
    const endDate = new Date(getFormattedDateString(date))
    if (endDate <= selectedCheckInDate) {
      return true
    }

    let currDate = new Date(selectedCheckInDate)
    while (currDate <= endDate) {
      if (isDateBookedOut(currDate)) {
        return true
      }
      currDate.setDate(currDate.getDate() + 1)
    }

    return false
  }

  const handleChangeStartDate = (startDate) => {
    if (startDate >= selectedCheckOutDate) {
      setSelectedCheckOutDate(null)
    }
    const newCheckInDate = new Date(getFormattedDateString(startDate))
    setSelectedCheckInDate(dayjs(newCheckInDate)) // need to use dayjs because thats the MUI datepicker value type
  }

  const handleChangeEndDate = (endDate) => {
    const newCheckOutDate = new Date(getFormattedDateString(endDate))
    setSelectedCheckOutDate(dayjs(newCheckOutDate))
  }

  const getFormattedDateString = (date) => {
    return dayjs(date).format("YYYY-MM-DD")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedCheckOutDate) {
      alert("Please select an end date before submitting")
      return
    }

    if (!userData) {
      alert("Please login to your account before booking!")
      return
    }

    const checkInFormatted = selectedCheckInDate.toDate()
    const checkOutFormatted = selectedCheckOutDate.toDate()

    try {
      const booking = {
        check_in: checkInFormatted,
        check_out: checkOutFormatted,
        user_id: `/users/${userData.uid}`,
      }
      const docRef = await addDoc(bookingCollectionRef, booking)

      if (docRef.id) {
        setBookingSuccessful(true)
        setTimeout(() => {
          setBookingSuccessful(false)
        }, 3000)
        setExistingBookings([...existingBookings, booking])
      }
    } catch (error) {
      setBookingErrorMessage("Failed to make booking. Please try again.")
      setTimeout(() => {
        setBookingErrorMessage("")
      }, 3000)
    }
  }

  const setEarliestDefaultCheckInDate = () => {
    let currDate = new Date()
    let dateKey = currDate.toDateString()

    while (
      dateAvailabilities.has(dateKey) &&
      dateAvailabilities.get(dateKey) >= maxSpotsAvailablePerDay
    ) {
      currDate.setDate(currDate.getDate() + 1)
      dateKey = currDate.toDateString()
    }

    setSelectedCheckInDate(dayjs(currDate))
  }

  const getDateRangeArray = () => {
    if (!selectedCheckInDate || !selectedCheckOutDate) {
      return []
    }

    let dates = []
    let currDate = new Date(getFormattedDateString(selectedCheckInDate))
    const endDate = new Date(getFormattedDateString(selectedCheckOutDate))

    while (currDate < endDate) {
      dates.push(new Date(currDate.getTime()))
      currDate.setDate(currDate.getDate() + 1)
    }

    return dates
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "60%",
          }}
        >
          <div>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                margin: "1.5rem",
              }}
            >
              Make a Booking
            </h2>
            <form onSubmit={handleSubmit}>
              <FormControl style={{ margin: "1.5rem" }}>
                <FormLabel style={{ textAlign: "left" }}>
                  Select a Check-In Date
                </FormLabel>
                <DatePicker
                  value={selectedCheckInDate}
                  onChange={handleChangeStartDate}
                  shouldDisableDate={isStartDateInvalid}
                  disablePast
                  disableHighlightToday
                />
                <FormLabel style={{ textAlign: "left", marginTop: "1rem" }}>
                  Select a Check-Out Date
                </FormLabel>
                <DatePicker
                  value={selectedCheckOutDate}
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
          </div>
          <div>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                margin: "1.5rem",
              }}
            >
              Available Spots Left:
            </h2>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0",
              }}
            >
              {dateRange.map((d, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      listStyleType: "none",
                      margin: "0",
                    }}
                  >
                    {`${d.toDateString()}: ${
                      maxSpotsAvailablePerDay -
                        dateAvailabilities.get(d.toDateString()) ||
                      maxSpotsAvailablePerDay
                    }`}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      {bookingSuccessful ? (
        <Alert severity="success">Booking was made successfully</Alert>
      ) : null}
      {bookingErrorMessage !== "" ? (
        <Alert severity="error">{bookingErrorMessage}</Alert>
      ) : null}
    </>
  )
}

export default BookingForm

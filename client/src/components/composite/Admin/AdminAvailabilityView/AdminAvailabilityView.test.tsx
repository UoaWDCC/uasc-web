import { Timestamp } from "firebase/firestore"
import {
  CondensedBookingInfoColumn,
  formatBookingSlotsForAvailabilityView
} from "./AdminAvailabilityView"

describe("tableData", () => {
  it("should return the correct data when startDate and endDate are provided", () => {
    const startDate = { seconds: 1000, nanoseconds: 0 }
    const endDate = { seconds: 2000, nanoseconds: 0 }
    const slots = [
      {
        id: "1",
        date: { seconds: 1500, nanoseconds: 0 },
        maxBookings: 10,
        availableSpaces: 5
      },
      {
        id: "2",
        date: { seconds: 2500, nanoseconds: 0 },
        maxBookings: 20,
        availableSpaces: 15
      }
    ]
    const expected: CondensedBookingInfoColumn[] = [
      {
        uid: "1",
        Date: new Date(1500 * 1000).toDateString(),
        "Max Bookings": "10",
        "Available Spaces": "5"
      }
    ]
    const result = formatBookingSlotsForAvailabilityView(
      startDate as Timestamp,
      endDate as Timestamp,
      slots
    ) // replace with your actual function
    expect(result).toEqual(expected)
  })
})

import { dateToFirestoreTimeStamp } from "data-layer/adapters/DateUtils"
import BookingHistoryService from "./BookingHistoryService"
import { Timestamp } from "firebase-admin/firestore"
import db from "data-layer/adapters/FirestoreCollections"
import { cleanFirestore } from "test-config/TestUtils"

const bookingHistoryService = new BookingHistoryService()
describe("BookingHistoryService integration tests", () => {
  afterEach(async () => {
    await cleanFirestore()
  })

  it("Should be able to add an event for deleted bookings", async () => {
    const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
    const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))
    const currentTime = dateToFirestoreTimeStamp(new Date())

    const newEvent = await bookingHistoryService.addBookingDeletedEvent({
      uid: "user-removed-from-booking",
      start_date: startDate as Timestamp,
      end_date: endDate as Timestamp,
      event_type: "removed_user_from_booking",
      timestamp: currentTime
    })

    const result = db.bookingHistory.doc("user-removed-from-booking").get()

    expect(result).toEqual(newEvent)
  })

  it("Should be able to add an event for created bookings", async () => {
    const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
    const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))
    const currentTime = dateToFirestoreTimeStamp(new Date())

    const newEvent = await bookingHistoryService.addBookingAddedEvent({
      uid: "user-added-to-booking",
      start_date: startDate as Timestamp,
      end_date: endDate as Timestamp,
      event_type: "added_user_to_booking",
      timestamp: currentTime
    })

    const result = db.bookingHistory.doc("user-added-to-booking").get()

    expect(result).toEqual(newEvent)
  })

  it("Should be able to add an event for availability changes", async () => {
    const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
    const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))
    const currentTime = dateToFirestoreTimeStamp(new Date())

    const newEvent = await bookingHistoryService.addAvailibilityChangeEvent({
      start_date: startDate as Timestamp,
      end_date: endDate as Timestamp,
      event_type: "changed_date_availability",
      timestamp: currentTime,
      change: -69
    })

    const result = db.bookingHistory.doc(newEvent.id).get()

    expect(result).toEqual(newEvent)
  })
})

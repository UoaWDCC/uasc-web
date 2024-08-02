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

  it("Should be able to fetch history in between a range of dates", async () => {
    /**
     * In these tests we don't care about these
     */
    const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
    const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))

    const searchStartDate = dateToFirestoreTimeStamp(new Date(2001, 10, 6))
    const searchEndDate = dateToFirestoreTimeStamp(new Date(2001, 10, 9))

    const availabilityEvent =
      await bookingHistoryService.addAvailibilityChangeEvent({
        timestamp: dateToFirestoreTimeStamp(new Date(2001, 10, 9)),
        change: 69,
        start_date: startDate,
        end_date: endDate,
        event_type: "changed_date_availability"
      })

    const deletedEvent = await bookingHistoryService.addBookingDeletedEvent({
      timestamp: dateToFirestoreTimeStamp(new Date(2001, 10, 9)),
      start_date: startDate,
      end_date: endDate,
      event_type: "removed_user_from_booking",
      uid: "deleted-user"
    })

    const addedEvent = await bookingHistoryService.addBookingAddedEvent({
      timestamp: dateToFirestoreTimeStamp(new Date(2001, 10, 9)),
      start_date: startDate,
      end_date: endDate,
      event_type: "added_user_to_booking",
      uid: "added-user"
    })

    const notIncludedEvent = await bookingHistoryService.addBookingAddedEvent({
      timestamp: dateToFirestoreTimeStamp(new Date(2001, 10, 10)),
      start_date: startDate,
      end_date: endDate,
      event_type: "added_user_to_booking",
      uid: "unincluded-user"
    })

    const foundEvents =
      await bookingHistoryService.getAllHistoryBetweenDateRange(
        searchStartDate,
        searchEndDate
      )

    expect(foundEvents).toContainEqual(availabilityEvent)
    expect(foundEvents).toContainEqual(addedEvent)
    expect(foundEvents).toContainEqual(deletedEvent)
    expect(foundEvents).not.toContainEqual(notIncludedEvent)
  })
  it("Should be able to fetch the latest X events")
})

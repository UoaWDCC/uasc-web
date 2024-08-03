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

    const event = {
      uid: "user-removed-from-booking",
      start_date: startDate as Timestamp,
      end_date: endDate as Timestamp,
      event_type: "removed_user_from_booking",
      timestamp: currentTime
    } as const

    const newEvent = await bookingHistoryService.addBookingDeletedEvent(event)

    const result = (await db.bookingHistory.doc(newEvent.id).get()).data()

    expect(result).toEqual(event)
  })

  it("Should be able to add an event for created bookings", async () => {
    const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
    const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))
    const currentTime = dateToFirestoreTimeStamp(new Date())

    const event = {
      uid: "user-added-to-booking",
      start_date: startDate as Timestamp,
      end_date: endDate as Timestamp,
      event_type: "added_user_to_booking",
      timestamp: currentTime
    } as const

    const newEvent = await bookingHistoryService.addBookingAddedEvent(event)

    const result = (await db.bookingHistory.doc(newEvent.id).get()).data()

    expect(result).toEqual(event)
  })

  it("Should be able to add an event for availability changes", async () => {
    const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
    const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))
    const currentTime = dateToFirestoreTimeStamp(new Date())

    const event = {
      start_date: startDate as Timestamp,
      end_date: endDate as Timestamp,
      event_type: "changed_date_availability",
      timestamp: currentTime,
      change: -69
    } as const

    const newEvent =
      await bookingHistoryService.addAvailibilityChangeEvent(event)

    const result = await (await db.bookingHistory.doc(newEvent.id).get()).data()

    expect(result).toEqual(event)
  })
  describe("Fetching events", () => {
    /**
     * In these tests we don't care about these
     */
    const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
    const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))

    const availabilityEvent = {
      timestamp: Timestamp.fromDate(new Date(2001, 10, 9)),
      change: 69,
      start_date: startDate,
      end_date: endDate,
      event_type: "changed_date_availability"
    } as const

    const deletedEvent = {
      timestamp: Timestamp.fromDate(new Date(2001, 10, 9)),
      start_date: startDate,
      end_date: endDate,
      event_type: "removed_user_from_booking",
      uid: "deleted-user"
    } as const

    const addedEvent = {
      timestamp: Timestamp.fromDate(new Date(2001, 10, 9)),
      start_date: startDate,
      end_date: endDate,
      event_type: "added_user_to_booking",
      uid: "added-user"
    } as const

    const notIncludedEvent = {
      timestamp: Timestamp.fromDate(new Date(2001, 10, 10)),
      start_date: startDate,
      end_date: endDate,
      event_type: "added_user_to_booking",
      uid: "unincluded-user"
    } as const

    it("Should be able to fetch history in between a range of dates", async () => {
      const searchStartDate = dateToFirestoreTimeStamp(new Date(2001, 10, 6))
      const searchEndDate = dateToFirestoreTimeStamp(new Date(2001, 10, 9))

      const { id: availabilityId } =
        await bookingHistoryService.addAvailibilityChangeEvent(
          availabilityEvent
        )

      const { id: deletedId } =
        await bookingHistoryService.addBookingDeletedEvent(deletedEvent)

      const { id: addedId } =
        await bookingHistoryService.addBookingAddedEvent(addedEvent)

      const { id: notIncludedId } =
        await bookingHistoryService.addBookingAddedEvent(notIncludedEvent)

      const foundEvents =
        await bookingHistoryService.getAllHistoryBetweenDateRange(
          searchStartDate,
          searchEndDate
        )

      expect(foundEvents).toContainEqual({ ...addedEvent, id: addedId })
      expect(foundEvents).toContainEqual({ ...deletedEvent, id: deletedId })
      expect(foundEvents).toContainEqual({
        ...availabilityEvent,
        id: availabilityId
      })
      expect(foundEvents).not.toContainEqual({
        ...notIncludedEvent,
        id: notIncludedId
      })
    })

    it("Should be able to fetch the latest X events", async () => {
      // Ordering matters! Earlier addition means it should be the first out
      const { id: notIncludedId } =
        await bookingHistoryService.addBookingAddedEvent(notIncludedEvent)

      const { id: availabilityId } =
        await bookingHistoryService.addAvailibilityChangeEvent(
          availabilityEvent
        )

      const { id: deletedId } =
        await bookingHistoryService.addBookingDeletedEvent(deletedEvent)

      const { id: addedId } =
        await bookingHistoryService.addBookingAddedEvent(addedEvent)

      const PAGE_LENGTH = 3 as const

      const { data: foundEvents, nextCursor } =
        await bookingHistoryService.getLatestHistory(PAGE_LENGTH)

      expect(nextCursor).not.toBeUndefined()
      expect(foundEvents).toHaveLength(PAGE_LENGTH)

      expect(foundEvents).toContainEqual({ ...addedEvent, id: addedId })
      expect(foundEvents).toContainEqual({ ...deletedEvent, id: deletedId })
      expect(foundEvents).toContainEqual({
        ...availabilityEvent,
        id: availabilityId
      })
      expect(foundEvents).not.toContainEqual({
        ...notIncludedEvent,
        id: notIncludedId
      })
    })
  })
})

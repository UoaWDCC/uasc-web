import { cleanFirestore } from "test-config/TestUtils"
import EventService from "./EventService"
import {
  dateToFirestoreTimeStamp,
  removeUnderscoresFromTimestamp
} from "data-layer/adapters/DateUtils"
import { Event, EventReservation } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { Timestamp } from "firebase-admin/firestore"

const eventService = new EventService()

const startDate = new Date(2024, 1, 1)
const endDate = new Date(2024, 1, 2)
const startTimestamp = dateToFirestoreTimeStamp(startDate)
const endTimestamp = dateToFirestoreTimeStamp(endDate)

const laterStartDate = dateToFirestoreTimeStamp(new Date(2024, 2, 2))

const event1: Event = {
  title: "UASC new event",
  description: "Grand opening of the website.",
  location: "Virtual pizza event",
  physical_start_date: startTimestamp,
  sign_up_start_date: startTimestamp,
  sign_up_end_date: endTimestamp
}
const event2: Event = {
  title: "Snowboard racing",
  description: "Race and see who's the fastest!",
  location: "Snowsport club",
  physical_start_date: startTimestamp,
  sign_up_start_date: startTimestamp,
  sign_up_end_date: endTimestamp
}
const now = new Date(Date.now())
const futureEvent: Event = {
  title: "Scheduled event",
  location: "Future event",
  physical_start_date: Timestamp.fromDate(
    new Date(now.getUTCFullYear() + 1, 1, 1)
  ),
  sign_up_start_date: Timestamp.fromDate(
    new Date(now.getUTCFullYear() + 1, 1, 1)
  ),
  sign_up_end_date: Timestamp.fromDate(new Date(now.getUTCFullYear() + 1, 1, 1))
}

const reservation1: EventReservation = {
  first_name: "John",
  last_name: "Appleseed",
  email: "test@gmail.com",
  is_member: true,
  timestamp: Timestamp.fromDate(startDate)
}
const reservation2: EventReservation = {
  first_name: "Jane",
  last_name: "Pearseed",
  email: "test2@gmail.com",
  is_member: false,
  timestamp: Timestamp.fromDate(startDate)
}

describe("EventService integration tests", () => {
  afterEach(async () => {
    await cleanFirestore()
  })

  it("Should be able to fetch the latest X events (based on when the event actually starts), descending", async () => {
    const { id: idEarly } = await eventService.createEvent(event1)
    const { id: idLater } = await eventService.createEvent({
      ...event1,
      physical_start_date: laterStartDate
    })

    const page1Events = await eventService.getAllEvents(1)
    expect(page1Events.events).toHaveLength(1)
    expect(
      page1Events.events.some((event) => event.id === idLater)
    ).toBeTruthy()

    expect(page1Events.nextCursor).toBeDefined()

    let snapshot
    if (page1Events.nextCursor) {
      snapshot = await eventService.getEventSnapshot(page1Events.nextCursor)
    }

    const page2Events = await eventService.getAllEvents(1, snapshot)
    expect(page2Events.events).toHaveLength(1)
    expect(
      page2Events.events.some((event) => event.id === idEarly)
    ).toBeTruthy()
  })

  it("Should be able to add an event", async () => {
    const newEvent = await eventService.createEvent(event1)

    const fetchedEvent = await FirestoreCollections.events
      .doc(newEvent.id)
      .get()

    const data = fetchedEvent.data()

    expect({
      ...data,
      sign_up_end_date: removeUnderscoresFromTimestamp(data.sign_up_end_date),
      sign_up_start_date: removeUnderscoresFromTimestamp(
        data.sign_up_start_date
      )
    }).toEqual(event1)
  })

  it("Should be able to get an event", async () => {
    const newEvent = await eventService.createEvent(event1)

    const fetchedEvent = await eventService.getEventById(newEvent.id)

    expect({
      ...fetchedEvent,
      sign_up_end_date: removeUnderscoresFromTimestamp(
        fetchedEvent.sign_up_end_date
      ),
      sign_up_start_date: removeUnderscoresFromTimestamp(
        fetchedEvent.sign_up_start_date
      )
    }).toEqual(event1)
  })

  it("Should be able to get current existing events", async () => {
    // Create past events
    await eventService.createEvent(event1)
    await eventService.createEvent(event2)
    // Create a future event
    const newEvent = await eventService.createEvent(futureEvent)

    const futureEvents = await eventService.getActiveEvents()

    expect(futureEvents.length).toBe(1)
    expect(futureEvents).toEqual([{ ...futureEvent, id: newEvent.id }])
  })

  it("Should be able to update an event", async () => {
    const newEvent = await eventService.createEvent(event1)

    await eventService.updateEvent(newEvent.id, {
      title: "Wow pizza???"
    })

    const fetchedEvent = await eventService.getEventById(newEvent.id)

    expect(fetchedEvent.title).toBe("Wow pizza???")
  })

  it("Should be able to delete an event", async () => {
    const newEvent = await eventService.createEvent(event1)
    await eventService.deleteEvent(newEvent.id)

    const fetchedEvent = await eventService.getEventById(newEvent.id)

    expect(fetchedEvent).toBe(undefined)
  })

  it("Should delete an event and also all reservations", async () => {
    const newEvent = await eventService.createEvent(event1)
    const newReservation1 = await eventService.addReservation(
      newEvent.id,
      reservation1
    )
    const newReservation2 = await eventService.addReservation(
      newEvent.id,
      reservation2
    )

    await eventService.deleteEvent(newEvent.id)

    const fetchedReservation1 = await eventService.getReservationById(
      newEvent.id,
      newReservation1.id
    )
    expect(fetchedReservation1).toBe(undefined)
    const fetchedReservation2 = await eventService.getReservationById(
      newEvent.id,
      newReservation2.id
    )
    expect(fetchedReservation2).toBe(undefined)
  })

  it("Should not delete other reservations when deleting an event document", async () => {
    const newEvent = await eventService.createEvent(event1)
    await eventService.addReservation(newEvent.id, reservation1)
    await eventService.addReservation(newEvent.id, reservation2)
    const newEvent2 = await eventService.createEvent(event2)
    const newReservation3 = await eventService.addReservation(
      newEvent2.id,
      reservation1
    )
    const newReservation4 = await eventService.addReservation(
      newEvent2.id,
      reservation2
    )

    await eventService.deleteEvent(newEvent.id)
    const fetchedReservation3 = await eventService.getReservationById(
      newEvent2.id,
      newReservation3.id
    )
    expect(fetchedReservation3).toEqual(reservation1)
    const fetchedReservation4 = await eventService.getReservationById(
      newEvent2.id,
      newReservation4.id
    )
    expect(fetchedReservation4).toEqual(reservation2)
  })

  /**
   * Event reservation nested collection methods
   */
  describe("EventReservation integration tests", () => {
    it("Should be able to add a event reservation", async () => {
      const newEvent = await eventService.createEvent(event1)

      const reservation = await eventService.addReservation(
        newEvent.id,
        reservation1
      )
      const fetchedReservation = await FirestoreCollections.events
        .doc(newEvent.id)
        .collection("reservations") // subject to place as a constant somewhere
        .doc(reservation.id)
        .get()
      expect(fetchedReservation.data()).toEqual(reservation1)
    })

    it("Should be able to get an event reservation", async () => {
      const newEvent = await eventService.createEvent(event1)
      const reservation = await eventService.addReservation(
        newEvent.id,
        reservation1
      )
      const fetchedReservation = await eventService.getReservationById(
        newEvent.id,
        reservation.id
      )
      expect(fetchedReservation).toEqual(reservation1)
    })

    it("Should get the total count of active event reservations", async () => {
      // An older event shouldn't be counted.
      const oldEvent = await eventService.createEvent(event1)
      await eventService.addReservation(oldEvent.id, reservation1)
      // Should only count reservations for future events
      const newEvent = await eventService.createEvent(futureEvent)
      await eventService.addReservation(newEvent.id, reservation1)
      await eventService.addReservation(newEvent.id, reservation2)

      const eventCounts = await eventService.getActiveReservationsCount()
      expect(eventCounts).toStrictEqual({ [newEvent.id]: 2 })
    })

    it("Should get all event reservations", async () => {
      const newEvent = await eventService.createEvent(event1)
      await eventService.addReservation(newEvent.id, reservation1)
      await eventService.addReservation(newEvent.id, reservation2)
      const reservations = await eventService.getAllReservations(newEvent.id)
      expect(reservations.length).toBe(2)
      expect(reservations).toContainEqual(reservation1)
      expect(reservations).toContainEqual(reservation2)
    })

    it("Should be able to update an event reservation", async () => {
      const newEvent = await eventService.createEvent(event1)

      const reservation = await eventService.addReservation(
        newEvent.id,
        reservation1
      )

      await eventService.updateReservation(newEvent.id, reservation.id, {
        first_name: "Jan"
      })

      const fetchedReservation = await FirestoreCollections.events
        .doc(newEvent.id)
        .collection("reservations") // subject to place as a constant somewhere
        .doc(reservation.id)
        .get()

      expect(fetchedReservation.data().first_name).toBe("Jan")
    })

    it("Should be able to delete an event reservation", async () => {
      const newEvent = await eventService.createEvent(event1)

      const reservation = await eventService.addReservation(
        newEvent.id,
        reservation1
      )

      await eventService.deleteReservation(newEvent.id, reservation.id)

      const fetchedReservation = await FirestoreCollections.events
        .doc(newEvent.id)
        .collection("reservations") // subject to place as a constant somewhere
        .doc(reservation.id)
        .get()
      expect(fetchedReservation.data()).toBe(undefined)
    })
  })
})

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

const startDate = dateToFirestoreTimeStamp(new Date(2024, 1, 1))
const endDate = dateToFirestoreTimeStamp(new Date(2024, 1, 2))

const event1: Event = {
  title: "UASC new event",
  description: "Grand opening of the website.",
  location: "Virtual pizza event",
  start_date: startDate,
  end_date: endDate
}
const event2: Event = {
  title: "Snowboard racing",
  description: "Race and see who's the fastest!",
  location: "Snowsport club",
  start_date: startDate,
  end_date: endDate
}

const reservation1: EventReservation = {
  first_name: "John",
  last_name: "Appleseed",
  email: "test@gmail.com",
  is_member: true
}
const reservation2: EventReservation = {
  first_name: "Jane",
  last_name: "Pearseed",
  email: "test2@gmail.com",
  is_member: false
}

describe("EventService integration tests", () => {
  afterEach(async () => {
    await cleanFirestore()
  })

  it("Should be able to add an event", async () => {
    const newEvent = await eventService.createEvent(event1)

    const fetchedEvent = await FirestoreCollections.events
      .doc(newEvent.id)
      .get()

    const data = fetchedEvent.data()

    expect({
      ...data,
      end_date: removeUnderscoresFromTimestamp(data.end_date),
      start_date: removeUnderscoresFromTimestamp(data.start_date)
    }).toEqual(event1)
  })

  it("Should be able to get an event", async () => {
    const newEvent = await eventService.createEvent(event1)

    const fetchedEvent = await eventService.getEventById(newEvent.id)

    expect({
      ...fetchedEvent,
      end_date: removeUnderscoresFromTimestamp(fetchedEvent.end_date),
      start_date: removeUnderscoresFromTimestamp(fetchedEvent.start_date)
    }).toEqual(event1)
  })

  it("Should be able to get current existing events", async () => {
    // Create past events
    await eventService.createEvent(event1)
    await eventService.createEvent(event2)
    // Create a future event
    const now = new Date(Date.now())
    const scheduledEvent: Event = {
      title: "Scheduled event",
      location: "Future event",
      start_date: Timestamp.fromDate(new Date(now.getUTCFullYear() + 1, 1, 1)),
      end_date: Timestamp.fromDate(new Date(now.getUTCFullYear() + 1, 1, 1))
    }
    await eventService.createEvent(scheduledEvent)

    const futureEvents = await eventService.getActiveEvents()

    expect(futureEvents.length).toBe(1)
    expect({
      ...futureEvents[0]
    }).toEqual(scheduledEvent)
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

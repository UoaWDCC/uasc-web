import { cleanFirestore } from "test-config/TestUtils"
import EventService from "./EventService"
import {
  dateToFirestoreTimeStamp,
  removeUnderscoresFromTimestamp
} from "data-layer/adapters/DateUtils"
import { Event, EventReservation } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"

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

const reservation1: EventReservation = {
  first_name: "John",
  last_name: "Appleseed",
  email: "test@gmail.com",
  is_member: true
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
      const fetchedReservation = await eventService.getReservation(
        newEvent.id,
        reservation.id
      )
      expect(fetchedReservation).toEqual(reservation1)
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

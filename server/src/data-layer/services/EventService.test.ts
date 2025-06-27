import { cleanFirestore } from "test-config/TestUtils"
import EventService from "./EventService"
import {
  dateToFirestoreTimeStamp,
  removeUnderscoresFromTimestamp
} from "data-layer/adapters/DateUtils"
import type { Event } from "data-layer/models/firebase"
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
})

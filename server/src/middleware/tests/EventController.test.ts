import EventService from "data-layer/services/EventService"
import { request } from "../routes.setup"
import { Event, EventReservation } from "../../data-layer/models/firebase"
import { Timestamp } from "firebase-admin/firestore"

const earlierStartDate = Timestamp.fromDate(new Date(2023, 1, 1))
const startDate = Timestamp.fromDate(new Date(Date.now() + 60000)) // plus one min
const laterStartDate = Timestamp.fromDate(new Date(Date.now() + 120000)) // plus two min
const endDate = Timestamp.fromDate(new Date(2024, 1, 2))
/**
 * Event with the earlier start date
 */
const event1: Event = {
  title: "UASC New event",
  location: "UASC",
  physical_start_date: earlierStartDate,
  sign_up_start_date: earlierStartDate,
  sign_up_end_date: earlierStartDate
}

/**
 * Event with the later start date
 */
const event2: Event = {
  title: "Straight Zhao",
  location: "UASC",
  physical_start_date: startDate,
  sign_up_start_date: startDate,
  sign_up_end_date: endDate,
  google_forms_link: "https://random.com/event2"
}

const event3: Event = {
  title: "Another Event",
  location: "Krispy Kreme",
  physical_start_date: laterStartDate,
  sign_up_start_date: earlierStartDate,
  sign_up_end_date: earlierStartDate,
  google_forms_link: "https://random.com/event3"
}
const reservation1: Omit<EventReservation, "timestamp"> = {
  first_name: "John",
  last_name: "Doe",
  email: "test@email.com",
  is_member: true
}

describe("EventController endpoint tests", () => {
  const eventService = new EventService()

  describe("GET /events", () => {
    it("should fetch all events based on cursor", async () => {
      const { id: id1 } = await eventService.createEvent(event1)
      const { id: id2 } = await eventService.createEvent(event2)

      let res = await request.get("/events").query({ limit: 1 }).send()

      /**
       * We should first fetch the events starting later...
       */
      expect(res.body.data).toHaveLength(1)
      expect(res.body.data).not.toContainEqual({ ...event1, id: id1 })
      expect(res.body.data).toContainEqual({ ...event2, id: id2 })
      expect(res.status).toEqual(200)

      res = await request
        .get("/events")
        .query({ cursor: res.body.nextCursor, limit: 1 })
        .send()

      expect(res.body.data).toHaveLength(1)
      expect(res.body.data).toContainEqual({ ...event1, id: id1 })
      expect(res.body.data).not.toContainEqual({ ...event2, id: id2 })
      expect(res.status).toEqual(200)
    })

    it("should include google_forms_link if event is within 1 minute", async () => {
      const { id: id2 } = await eventService.createEvent(event2)

      const res = await request.get("/events").send()

      expect(res.body.data).toContainEqual(
        expect.objectContaining({
          id: id2,
          google_forms_link: "https://random.com/event2"
        })
      )
    })

    it("should not include google_forms_link if event is not within 1 minute", async () => {
     await eventService.createEvent(event3)

      const res = await request.get("/events").send()

      expect(res.body.data).toContainEqual(
        expect.not.objectContaining({
          google_forms_link: expect.not.stringContaining("https://random.com/event3")
        })
      )
    })
  })

  describe("/events/signup", () => {
    it("should return 404 if the event does not exist", async () => {
      const res = await request.post("/events/signup").send({
        event_id: "non-existent-event",
        reservation: reservation1
      })
      expect(res.status).toEqual(404)
    })

    it("should return 400 if the event is full", async () => {
      const event = await eventService.createEvent({
        ...event1,
        max_occupancy: 0
      })
      const res = await request.post("/events/signup").send({
        event_id: event.id,
        reservation: reservation1
      })
      expect(res.status).toEqual(400)
      expect(res.body.error).toEqual("Maximum event occupancy reached.")
    })

    it("should return 400 if already signed up to event", async () => {
      const event = await eventService.createEvent(event1)
      await eventService.addReservation(event.id, {
        ...reservation1,
        timestamp: Timestamp.now()
      })
      const res = await request.post("/events/signup").send({
        event_id: event.id,
        reservation: reservation1
      })
      expect(res.status).toEqual(400)
      expect(res.body.error).toEqual(
        "You have already signed up for this event."
      )
    })

    it("should allow user to signup to an event", async () => {
      const event = await eventService.createEvent(event1)
      const res = await request.post("/events/signup").send({
        event_id: event.id,
        reservation: reservation1
      })
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual("Successfully signed up for event.")
      expect(res.body.data).toEqual({
        first_name: reservation1.first_name,
        last_name: reservation1.last_name,
        email: reservation1.email
      })
    })
  })

  describe("GET /events/:id", () => {
    it("should return the event details for a valid event ID", async () => {
      const { id: id1 } = await eventService.createEvent(event1)
      const res = await request.get(`/events/${id1}`).send()
      expect(res.status).toEqual(200)
      expect(res.body.data).toBeDefined()
      expect(res.body.data.title).toEqual("UASC New event")
      expect(res.body.data.location).toEqual("UASC")
    })

    it("should return 404 if the event does not exist", async () => {
      const res = await request.get("/events/random-event").send()
      expect(res.status).toEqual(404)
      expect(res.body.error).toEqual("Event not found.")
    })
  })
})

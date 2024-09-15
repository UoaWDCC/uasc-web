import EventService from "data-layer/services/EventService"
import { request } from "../routes.setup"
import { Event, EventReservation } from "../../data-layer/models/firebase"
import { dateToFirestoreTimeStamp } from "data-layer/adapters/DateUtils"
import { Timestamp } from "firebase-admin/firestore"

const startDate = dateToFirestoreTimeStamp(new Date(2024, 1, 1))
const endDate = dateToFirestoreTimeStamp(new Date(2024, 1, 2))
const event1: Event = {
  title: "UASC New event",
  location: "UASC",
  start_date: startDate,
  end_date: endDate
}
const reservation1: Omit<EventReservation, "timestamp"> = {
  first_name: "John",
  last_name: "Doe",
  email: "test@email.com",
  is_member: true
}

describe("EventController endpoint tests", () => {
  const eventService = new EventService()
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
})

import EventService from "data-layer/services/EventService"
import { EventSignupBody } from "service-layer/request-models/EventRequests"
import { EventSignupResponse } from "service-layer/response-models/EventResponse"
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa"

@Route("events")
export class EventController extends Controller {
  /**
   * Signs up for an event
   */
  @SuccessResponse("200", "Successfully signed up for Event")
  @Post("signup")
  public async eventSignup(
    @Body() requestBody: EventSignupBody
  ): Promise<EventSignupResponse> {
    const { event_id, reservation } = requestBody
    const eventService = new EventService()
    // Check if the event exists
    const fetchedEvent = await eventService.getEventById(event_id)
    if (!fetchedEvent) {
      this.setStatus(404)
      return { error: "Event not found." }
    }
    // Check if the event is full
    const reservations = await eventService.getAllReservations(event_id)
    if (
      fetchedEvent.max_occupancy !== undefined &&
      reservations.length >= fetchedEvent.max_occupancy
    ) {
      this.setStatus(400)
      return { error: "Maximum event occupancy reached." }
    }
    // Check if the user is already signed up
    if (
      reservations.some(
        (r) => r.email.toLowerCase() === reservation.email.toLowerCase()
      )
    ) {
      this.setStatus(400)
      return { error: "You have already signed up for this event." }
    }
    // Sign up the user
    try {
      await eventService.addReservation(event_id, reservation)
      this.setStatus(200)
      return {
        message: "Successfully signed up for event.",
        data: {
          first_name: reservation.first_name,
          last_name: reservation.last_name,
          email: reservation.email
        }
      }
    } catch (e) {
      this.setStatus(500)
      return { error: "Failed to sign up for event." }
    }
  }
}

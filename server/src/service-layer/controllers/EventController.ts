import EventService from "data-layer/services/EventService"
import { EventSignupBody } from "service-layer/request-models/EventRequests"
import { EventSignupResponse } from "service-layer/response-models/EventResponse"
import {
  Get,
  Body,
  Controller,
  Post,
  Route,
  Request,
  SuccessResponse
} from "tsoa"
import express from "express"

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
        (r) =>
          r.email.trim().toLowerCase() ===
          reservation.email.trim().toLowerCase()
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

  @Get("/reservations/stream")
  public async streamSignupCounts(
    @Request() req: express.Request
  ): Promise<void> {
    // Set the required headers for SSE
    req.res.setHeader("Cache-Control", "no-cache")
    req.res.setHeader("Content-Type", "text/event-stream")
    req.res.setHeader("Access-Control-Allow-Origin", "*")
    req.res.setHeader("Connection", "keep-alive")
    req.res.flushHeaders()

    const eventService = new EventService()
    // Create something that updates every second
    const interValID = setInterval(async () => {
      const signupCount = await eventService.getActiveReservationsCount() // Fetch the current signup count
      req.res?.write(`${signupCount}\n`) // res.write() instead of res.send()
    }, 1000)

    // If the connection drops, stop sending events
    req.res?.on("close", () => {
      clearInterval(interValID) // Clear the loop
      req.res?.end()
    })
  }
}

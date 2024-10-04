import EventService from "data-layer/services/EventService"
import { EventSignupBody } from "service-layer/request-models/EventRequests"
import {
  EventSignupResponse,
  GetAllEventsResponse,
  GetEventResponse
} from "service-layer/response-models/EventResponse"
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Request,
  Route,
  SuccessResponse
} from "tsoa"
import express from "express"
import { Timestamp } from "firebase-admin/firestore"

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
      await eventService.addReservation(event_id, {
        ...reservation,
        timestamp: Timestamp.now()
      })
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

  /**
   * Fetches latest events starting from the event with the latest starting date
   * (**NOT** the signup open date) based on limit. Is paginated with a cursor
   */
  @Get()
  @SuccessResponse("200", "Successfully fetched all events")
  public async getAllEvents(
    @Query() limit: number = 20,
    @Query() cursor?: string
  ): Promise<GetAllEventsResponse> {
    try {
      const eventService = new EventService()

      let snapshot
      if (cursor) {
        snapshot = await eventService.getEventSnapshot(cursor)
      }

      const res = await eventService.getAllEvents(limit, snapshot)
      return { nextCursor: res.nextCursor, data: res.events }
    } catch (e) {
      return {
        error: "Something went wrong when fetching all events, please try again"
      }
    }
  }

  /**
   * Streams the signup count for active events signups.
   * Note that when testing this on swagger, the connection will remain open.
   */
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

    const signupRecord: Record<string, number> =
      await eventService.getActiveReservationsCount() // Fetch the current signup count
    req.res.write(`data: ${JSON.stringify(signupRecord)}\n\n`)

    const interValID = setInterval(async () => {
      const signupRecord: Record<string, number> =
        await eventService.getActiveReservationsCount()
      // NOTE: We use double new line because SSE requires this to indicate we're ready for the next event
      // We also need the data: to indicate data payload
      req.res.write(`data: ${JSON.stringify(signupRecord)}\n\n`) // res.write() instead of res.send()
    }, 5000)

    // If the connection drops, stop sending events
    req.res?.on("close", () => {
      clearInterval(interValID) // Clear the loop
      req.res?.end()
    })
  }

  @Get("{id}")
  @SuccessResponse("200", "Successfully fetched all events")
  public async getEventById(@Path() id: string): Promise<GetEventResponse> {
    try {
      const eventService = new EventService()
      const event = await eventService.getEventById(id)

      if (!event) {
        this.setStatus(404)
        return { error: "Event not found." }
      }

      return { data: event }
    } catch (e) {
      return {
        error: "Something went wrong when fetching all events, please try again"
      }
    }
  }
}

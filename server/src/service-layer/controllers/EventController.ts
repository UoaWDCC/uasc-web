import EventService from "data-layer/services/EventService"
import {
  GetAllEventsResponse,
  GetEventResponse
} from "service-layer/response-models/EventResponse"
import { Controller, Get, Path, Query, Route, SuccessResponse } from "tsoa"

@Route("events")
export class EventController extends Controller {
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

  @Get("{id}")
  @SuccessResponse("200", "Successfully fetched the event")
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
      this.setStatus(500)
      return {
        error: "Something went wrong when fetching the event, please try again"
      }
    }
  }
}

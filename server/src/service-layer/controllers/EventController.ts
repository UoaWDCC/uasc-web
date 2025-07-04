import EventService from "data-layer/services/EventService"
import { type DocumentSnapshot, Timestamp } from "firebase-admin/firestore"
import { getReasonPhrase, StatusCodes } from "http-status-codes"
import type { GetAllEventsResponse } from "service-layer/response-models/EventResponse"
import { Controller, Get, Query, Route, Security, SuccessResponse } from "tsoa"
import { ONE_MINUTE_IN_MS } from "../../business-layer/utils/EventConstants"

@Route("events")
export class EventController extends Controller {
  /**
   * Fetches events with pagination based on cursor
   * @param limit Maximum number of events to fetch
   * @param cursor Pagination cursor
   * @param isMember Whether the request is from a member
   * @returns Events response with next cursor
   */
  private async fetchEvents(
    limit: number = 20,
    cursor?: string,
    isMember: boolean = false
  ): Promise<GetAllEventsResponse> {
    try {
      const eventService = new EventService()
      let snapshot: DocumentSnapshot
      if (cursor) {
        snapshot = await eventService.getEventSnapshot(cursor)
      }
      const res = await eventService.getAllEvents(limit, snapshot)
      const currentTime = Timestamp.now()

      res.events.forEach((event) => {
        if (!event.sign_up_start_date) {
          return
        }
        const eventStartTime = event.sign_up_start_date
        const timeDifference =
          eventStartTime.toMillis() - currentTime.toMillis()
        // 1 minute (60000 milliseconds)
        if (
          timeDifference > ONE_MINUTE_IN_MS ||
          (!isMember && event.is_members_only)
        ) {
          delete event.google_forms_link
        }
      })

      return { nextCursor: res.nextCursor, data: res.events }
    } catch (e) {
      console.error(e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
      }
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
    return this.fetchEvents(limit, cursor, false)
  }

  /**
   * Fetches latest events starting from the event with the latest starting date
   * (**NOT** the signup open date) based on limit. Is paginated with a cursor.
   *
   * This endpoint is only accessible to members as it includes the sign up links
   * members-only events
   */
  @Get("for-members")
  @Security("jwt", ["member"])
  @SuccessResponse("200", "Successfully fetched all events")
  public async getAllEventsAsMember(
    @Query() limit: number = 20,
    @Query() cursor?: string
  ): Promise<GetAllEventsResponse> {
    return this.fetchEvents(limit, cursor, true)
  }
}

import type { BookingHistoryEvent, Event } from "data-layer/models/firebase"
import type { CommonResponse, CursorPaginatedResponse } from "./CommonResponse"

export interface FetchLatestBookingHistoryEventResponse
  extends CursorPaginatedResponse,
    CommonResponse {
  historyEvents?: BookingHistoryEvent[]
}

export interface GetEventResponse extends CommonResponse {
  data?: Event
}

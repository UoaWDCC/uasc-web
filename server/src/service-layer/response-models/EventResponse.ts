import { CommonResponse, CursorPaginatedResponse } from "./CommonResponse"
import { Event } from "data-layer/models/firebase"

export interface GetAllEventsResponse
  extends CommonResponse,
    CursorPaginatedResponse {
  data?: Event[]
}

export interface GetEventResponse extends CommonResponse {
  data?: Event
}

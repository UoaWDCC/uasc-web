import { CommonResponse, CursorPaginatedResponse } from "./CommonResponse"
import { Event } from "data-layer/models/firebase"

export interface EventSignupResponse extends CommonResponse {
  data?: {
    first_name: string
    last_name: string
    email: string
  }
}

export interface GetAllEventsResponse
  extends CommonResponse,
    CursorPaginatedResponse {
  data?: Event[]
}

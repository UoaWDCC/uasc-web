import { DocumentDataWithUid } from "data-layer/models/common"
import { CommonResponse, CursorPaginatedResponse } from "./CommonResponse"
import { Event } from "data-layer/models/firebase"

export interface GetAllEventsResponse
  extends CommonResponse,
    CursorPaginatedResponse {
  data?: DocumentDataWithUid<Event>[]
}

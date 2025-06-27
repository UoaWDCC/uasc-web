import type { DocumentDataWithUid } from "data-layer/models/common"
import type { CommonResponse, CursorPaginatedResponse } from "./CommonResponse"
import type { Event } from "data-layer/models/firebase"

export interface GetAllEventsResponse
  extends CommonResponse,
    CursorPaginatedResponse {
  data?: DocumentDataWithUid<Event>[]
}

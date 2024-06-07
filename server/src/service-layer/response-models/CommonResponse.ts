export interface CommonResponse {
  error?: string
  message?: string
}

export interface OffsetPaginatedResponse {
  /**
   * Indicates the offset that would give the next page of data
   *
   * **Will be undefined in case of no next offset**
   */
  nextOffset?: number
}

export interface CursorPaginatedResponse {
  /**
   * Needed for firestore operations which do not support offset
   * based pagination
   */
  nextCursor?: string
}

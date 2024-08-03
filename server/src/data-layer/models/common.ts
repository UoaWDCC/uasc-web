export type DocumentDataWithUid<T> = T & {
  /**
   * The ID of the document for which this document contains data.
   */
  id: string
}

/**
 * Utility type for functions that return cursor-based pages
 */
export type PaginatedFirebaseResponse<T> = {
  /**
   * The current "page" of data returned from querying
   */
  data: T[]
  /**
   * The cursor of the next page, is `undefined` if no such cursor exists
   */
  nextCursor?: string
}

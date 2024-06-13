export type DocumentDataWithUid<T> = T & {
  /**
   * The ID of the document for which this document contains data.
   */
  id: string
}

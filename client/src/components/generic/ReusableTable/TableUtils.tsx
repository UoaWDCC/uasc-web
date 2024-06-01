/**
 * @deprecated Exported for testing purposes
 */
export const TABLE_ROW_IDENTIFIER_KEY = "uid" as const
export type TableRowObjectWithIdentifier = {
  /**
   * Needs to be **unique** so that a callback can be attached to each row
   */
  [TABLE_ROW_IDENTIFIER_KEY]: string
}

export type TableRowOperationStyle =
  | "multiple-operations"
  | "single-operation"
  | "none"

export type TableRowOperation = {
  /**
   * The name of the operation
   */
  operationName: string
  handler: (identifier: string) => void
}

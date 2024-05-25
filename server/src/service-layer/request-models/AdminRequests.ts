export interface MakeDatesAvailableRequestBody {
  bookingSlotId: string
  /**
   * MUST be in format DD/MM/YYYY
   */
  startDate: string
  /**
   * MUST be in format DD/MM/YYYY
   */
  endDate: string
}

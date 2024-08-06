/**
 * Util object to be used for formatting messages that are shared between multiple components
 *
 * It is reccommended to put ALL messages in here to allow for modularity
 */
const Messages = {
  /**
   * Formatted message for confirming if a user should be added to a booking
   *
   * @param first_name of the user to be added to the booking - will display as `undefined` if not provided
   * @param last_name of the user to be added to the booking - will display as `undefined` if not provided
   * @param startDateString will display as `undefined` if not provided
   * @param endDateString will display as `undefined` if not provided
   */
  addUserToBooking: (
    first_name?: string,
    last_name?: string,
    startDateString?: string,
    endDateString?: string
  ) =>
    `Are you sure you want to add ${first_name} ${last_name} to the dates ${startDateString} - ${endDateString}` as const
} as const

export default Messages

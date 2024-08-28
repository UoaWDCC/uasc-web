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
    `Are you sure you want to add ${first_name} ${last_name} to the dates ${startDateString} - ${endDateString}` as const,

  /**
   * Generates a confirmation message for deleting a user's booking.
   *
   * This function constructs a confirmation message string that includes the user's email and the booking date.
   * The message warns the user that the deletion action is irreversible.
   *
   * @param {string} [email] - The email of the user whose booking is to be deleted. This parameter is optional.
   * @param {string} [dateString] - The date of the booking to be deleted. This parameter is optional.
   */
  deleteUserFromBooking: (email?: string, dateString?: string) =>
    `Are you SURE you want to delete the booking for the user with email ${email} on the date ${dateString}? This can NOT be undone!` as const
} as const

export default Messages

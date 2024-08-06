const Messages = {
  addUserToBooking: (
    first_name?: string,
    last_name?: string,
    startDateString?: string,
    endDateString?: string
  ) =>
    `Are you sure you want to add ${first_name} ${last_name} to the dates ${startDateString} - ${endDateString}` as const
}

export default Messages

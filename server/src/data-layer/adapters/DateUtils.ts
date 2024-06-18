import { Timestamp } from "firebase-admin/firestore"

/**
 * @param firestoreDate the timestamp to conver to date,
 * using Millisecond precision
 * @returns the new Date object
 */
export const firestoreTimestampToDate = (firestoreDate: Timestamp) => {
  return new Date(
    firestoreDate.seconds * 1000 + firestoreDate.nanoseconds / 1000000
  )
}

/**
 * converts a (even with underscores) to to its corresponding Timestamp
 *
 * @param date the date to be converted into a timestamp
 * @returns a timestamp representing the point in them corresponding to
 * the `getTime` method of the date
 */
export const dateToFirestoreTimeStamp = (date: Date) => {
  let output = Timestamp.fromDate(date) as Timestamp & {
    _seconds?: number
    _nanoseconds?: number
  }
  output = {
    seconds: output.seconds || output._seconds,
    nanoseconds: output.nanoseconds || output._nanoseconds
  } as Timestamp
  return output
}

/**
 * Util for tests
 */
export const removeUnderscoresFromTimestamp = (timestamp: {
  seconds?: number
  nanoseconds?: number
  _seconds?: number
  _nanoseconds?: number
}) => {
  const output = {
    seconds: timestamp._seconds || timestamp.seconds || 0,
    nanoseconds: timestamp._nanoseconds || timestamp.nanoseconds || 0
  } as Timestamp
  return output
}

const S_IN_DAY = 60 * 60 * 24

/**
 * Gets all timestamps within a range at a step resolution
 * of a multiple of days
 *
 * @param startDate timestamp (inclusive) of the first date
 * @param endDate timestamp (inclusive of the last date)
 * @param steps how many **days** to increment in
 * @returns an array of all timestamps in the range
 */
export const timestampsInRange = (
  startDate: Timestamp,
  endDate: Timestamp,
  steps = 1
) => {
  const dateArray = []
  let currentSeconds = startDate.seconds

  while (currentSeconds <= endDate.seconds) {
    dateArray.push(
      Timestamp.fromMillis(
        currentSeconds * 1000 + startDate.nanoseconds / 1000000
      )
    )
    currentSeconds += S_IN_DAY * steps
  }

  return dateArray
}

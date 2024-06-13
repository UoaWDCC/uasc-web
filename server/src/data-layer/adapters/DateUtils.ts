import { Timestamp } from "firebase-admin/firestore"

export const firestoreTimestampToDate = (firestoreDate: Timestamp) => {
  return new Date(firestoreDate.seconds * 1000) // date takes ms
}

export const dateToFirestoreTimeStamp = (date: Date) => {
  let output = Timestamp.fromDate(date)
  output = {
    seconds: output.seconds,
    nanoseconds: output.nanoseconds
  } as Timestamp
  return output
}

/**
 * removes all the time information from the timestamp
 * @param timestamp the timestamp to normalise
 */
export const normaliseFirestoreTimeStamp = (timestamp: Timestamp) =>
  dateToFirestoreTimeStamp(
    new Date(firestoreTimestampToDate(timestamp).toDateString())
  )

/**
 * @param startDate Date object
 * @param endDate Date object
 * @returns an array of all dates in with **increasing order** of the range (NOTE that months in JS start from 0)
 */
export const datesToDateRange = (startDate: Date, endDate: Date, steps = 1) => {
  const dateArray = []
  const currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate))
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps)
  }

  return dateArray
}

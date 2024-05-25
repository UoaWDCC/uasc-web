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
 *
 * @param startDate MUST be in the string format "MM/DD/YYYY"
 * @param endDate MUST be in the string format "MM/DD/YYYY"
 * @returns an array of all dates in the range (NOTE that months in JS start from 0)
 */
export const datesToDateRange = (startDate: Date, endDate: Date, steps = 1) => {
  const dateArray = []
  const currentDate = startDate

  while (currentDate <= new Date(endDate)) {
    dateArray.push(currentDate)
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps)
  }

  return dateArray
}

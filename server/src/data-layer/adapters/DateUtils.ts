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
 * @param startDate Date object
 * @param endDate Date object
 * @returns an array of all dates in with **increasing order** of the range (NOTE that months in JS start from 0)
 */
export const datesToDateRange = (startDate: Date, endDate: Date, steps = 1) => {
  const dateArray = []
  let currentDate = new Date(startDate.getTime())

  while (currentDate <= new Date(endDate.getTime())) {
    dateArray.push(new Date(currentDate.getTime()))
    // Use UTC date to prevent problems with time zones and DST
    currentDate = new Date(currentDate.getTime() + steps * 86400 * 1000)
  }

  return dateArray
}

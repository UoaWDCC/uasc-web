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

export const ddMmYyyyToMmDdYyyy = (dateString: string) => {
  const d = dateString.split("/")
  if (d.length < 3) {
    throw new Error("Invalid Date format")
  }
  return d[2] + "/" + d[1] + "/" + d[0]
}

/**
 *
 * @param startDate MUST be in the string format "MM/DD/YYYY"
 * @param endDate MUST be in the string format "MM/DD/YYYY"
 * @returns an array of all dates in the range (NOTE that months in JS start from 0)
 */
export const datesToDateRange = (
  startDate: string,
  endDate: string,
  steps = 1
) => {
  const dateArray = []
  const currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate))
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps)
  }

  return dateArray
}

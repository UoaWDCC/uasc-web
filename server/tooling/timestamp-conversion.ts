import { Timestamp } from "firebase-admin/firestore"

/**
 * Usage: ts-node timestamp-conversion.ts 2024-01-01 2024-12-31
 * format: YYYY-MM-DD
 */
const startDate = new Date(process.argv[2])
const endDate = new Date(process.argv[3])

const startTimestamp = Timestamp.fromDate(startDate)
const endTimestamp = Timestamp.fromDate(endDate)

console.log(`"startDate": {
  "seconds": ${startTimestamp.seconds},
  "nanoseconds": ${startTimestamp.nanoseconds}
},
"endDate": {
  "seconds": ${endTimestamp.seconds},
  "nanoseconds": ${endTimestamp.nanoseconds}
}`)

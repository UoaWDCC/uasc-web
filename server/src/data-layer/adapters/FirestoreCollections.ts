// credit https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
import "dotenv/config"
import {
  Booking,
  BookingSlot,
  UserAdditionalInfo
} from "data-layer/models/firebase"
import { admin } from "business-layer/security/Firebase"

const converter = <T>() => ({
  toFirestore: (data: any) => data,
  fromFirestore: (doc: any) => doc.data() as T
})

const firestore = Object.assign(
  () => {
    return admin.firestore()
  },
  {
    doc: <T>(path: string) => {
      return admin.firestore().doc(path).withConverter<T>(converter<T>())
    },
    collection: <T>(path: string) => {
      return admin.firestore().collection(path).withConverter<T>(converter<T>())
    }
  }
)

const db = {
  users: firestore.collection<UserAdditionalInfo>("users"),
  bookings: firestore.collection<Booking>("bookings"),
  bookingSlots: firestore.collection<BookingSlot>("booking_slots")
} as const

export default db

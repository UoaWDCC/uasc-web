// credit https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
import "dotenv/config"
import firestore from "./Firestore"
import {
  Booking,
  BookingHistoryEvent,
  BookingSlot,
  Event,
  UserAdditionalInfo
} from "data-layer/models/firebase"

const FirestoreCollections = {
  users: firestore.collection<UserAdditionalInfo>("users"),
  bookings: firestore.collection<Booking>("bookings"),
  bookingSlots: firestore.collection<BookingSlot>("booking_slots"),
  bookingHistory: firestore.collection<BookingHistoryEvent>("booking_history"),
  events: firestore.collection<Event>("events")
} as const

export default FirestoreCollections

// credit https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
import "dotenv/config"
import firestore from "./Firestore"
import { EventReservation } from "data-layer/models/firebase"

const FirestoreSubcollections = {
  reservations: (eventId: string) =>
    firestore.subcollection<EventReservation>("events", eventId, "reservations")
} as const

export default FirestoreSubcollections

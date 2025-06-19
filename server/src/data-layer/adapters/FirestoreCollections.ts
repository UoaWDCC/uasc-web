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
import {
  EMAIL_TEMPLATES_COLLECTION,
  MAIL_CONFIG_COLLECTION
} from "./CollectionNames"
import { EmailTemplate, MailConfig } from "../models/MailConfig"

const FirestoreCollections = {
  users: firestore.collection<UserAdditionalInfo>("users"),
  bookings: firestore.collection<Booking>("bookings"),
  bookingSlots: firestore.collection<BookingSlot>("booking_slots"),
  bookingHistory: firestore.collection<BookingHistoryEvent>("booking_history"),
  events: firestore.collection<Event>("events"),
  mailConfig: firestore.collection<MailConfig>(MAIL_CONFIG_COLLECTION),
  emailTemplates: firestore.collection<EmailTemplate>(
    EMAIL_TEMPLATES_COLLECTION
  )
} as const

export default FirestoreCollections

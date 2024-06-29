import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { BookingSlot } from "data-layer/models/firebase"
import { Timestamp } from "firebase-admin/firestore"
import { DocumentDataWithUid } from "data-layer/models/common"
import { firestoreTimestampToDate } from "data-layer/adapters/DateUtils"

export default class BookingSlotService {
  /**
   * Creates a bookings slot **with only ms precision**
   *
   * @param bookingSlotData the fields to add to the new `booking_slot` document
   * @returns the created `booking_slot` document
   */
  public async createBookingSlot(bookingSlotData: BookingSlot) {
    return await FirestoreCollections.bookingSlots.add({
      ...bookingSlotData,
      date: Timestamp.fromMillis(
        bookingSlotData.date.seconds * 1000 +
          bookingSlotData.date.nanoseconds / 1000000
      ) // Need to do this because firestore does not like "raw" {seconds, nanoseconds}
    })
  }

  /**
   * Fetches a full booking slot ID, given the document ID.
   * @param id The id of the booking slot ID to retrieve.
   */
  public async getBookingSlotById(
    id: string
  ): Promise<DocumentDataWithUid<BookingSlot>> {
    const result = await FirestoreCollections.bookingSlots.doc(id).get()

    return { ...result.data(), id: result.id }
  }

  public async getBookingSlotByDate(
    date: Timestamp
  ): Promise<Array<DocumentDataWithUid<BookingSlot>>> {
    const result = await FirestoreCollections.bookingSlots
      .where("date", "==", firestoreTimestampToDate(date))
      .get()
    const bookingSlotArray = result.docs.map((docs) => {
      return { ...docs.data(), id: docs.id }
    })
    return bookingSlotArray
  }

  public async getBookingSlotsBetweenDateRange(
    startDate: Timestamp,
    endDate: Timestamp
  ): Promise<Array<DocumentDataWithUid<BookingSlot>>> {
    const result = await FirestoreCollections.bookingSlots
      .where("date", ">=", firestoreTimestampToDate(startDate))
      .where("date", "<=", firestoreTimestampToDate(endDate))
      .get()
    const bookingSlotArray = result.docs.map((docs) => {
      return { ...docs.data(), id: docs.id }
    })
    return bookingSlotArray
  }

  // Update
  public async updateBookingSlot(
    bookingSlotId: string,
    bookingSlotData: Partial<BookingSlot>
  ) {
    return await FirestoreCollections.bookingSlots
      .doc(bookingSlotId)
      .update(bookingSlotData)
  }

  // Delete
  public async deleteBookingSlot(bookingSlotId: string) {
    return await FirestoreCollections.bookingSlots.doc(bookingSlotId).delete()
  }

  public async isLastSpotTaken(date: string): Promise<boolean> {
    const bookingSlots = await FirestoreCollections.bookingSlots
      .where("date", "==", date)
      .get()
    const availableSlots = bookingSlots.docs.length
    return availableSlots <= 1 // Current booking is the last one
  }
}

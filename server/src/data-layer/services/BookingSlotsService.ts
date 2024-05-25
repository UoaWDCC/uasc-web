import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { BookingSlot } from "data-layer/models/firebase"
import { Timestamp } from "firebase-admin/firestore"

type BookingSlotWithId = Array<
  BookingSlot & {
    /**
     * The ID of the document for which this document contains data.
     */
    id: string
  }
>

export default class BookingSlotService {
  // Create
  public async createBookingSlot(bookingSlotData: BookingSlot) {
    return await FirestoreCollections.bookingSlots.add(bookingSlotData)
  }

  public async getBookingSlotByDate(
    date: Timestamp
  ): Promise<BookingSlotWithId> {
    const result = await FirestoreCollections.bookingSlots
      .where("date", "==", date)
      .get()
    const bookingSlotArray = result.docs.map((docs) => {
      return { ...docs.data(), id: docs.id }
    })
    return bookingSlotArray
  }

  public async getBookingSlotsBetweenDateRange(
    startDate: Timestamp,
    endDate: Timestamp
  ): Promise<BookingSlotWithId> {
    const result = await FirestoreCollections.bookingSlots
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
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
}

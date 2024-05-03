import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { BookingSlot } from "data-layer/models/firebase"
import { Timestamp } from "firebase-admin/firestore"

export default class BookingSlotService {
  static createBookingSlot: any
  // Create
  public async createBookingSlot(bookingSlotData: BookingSlot) {
    return await FirestoreCollections.bookingSlots.add(bookingSlotData)
  }

  // Read
  public async getBookingSlotsStripeProductId(productId: string) {
    const result = await FirestoreCollections.bookingSlots
      .where("stripe_product_id", "==", productId)
      .get()
    const stripeProductIdArray = result.docs.map((docs) => docs.data())
    return stripeProductIdArray
  }

  public async getBookingSlotByDate(date: Timestamp) {
    // Not sure if this one works am I supposed to read between start and end date?
    const result = await FirestoreCollections.bookingSlots
      .where("date", "==", date)
      .get()
    const bookingSlotArray = result.docs.map((docs) => docs.data())
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

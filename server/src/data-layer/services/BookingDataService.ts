import { Booking } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"

export default class BookingDataService {
  // Create
  public async createBooking(bookingData: Booking) {
    return await FirestoreCollections.bookings.add(bookingData)
  }

  // Read
  public async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const result = await FirestoreCollections.bookings
      .where("user_id", "==", userId)
      .get()
    const userIdsArray = result.docs.map((docs) => docs.data())
    return userIdsArray
  }

  public async getBookingsByBookingId(
    bookingSlotID: string
  ): Promise<Booking[]> {
    const result = await FirestoreCollections.bookings
      .where("booking_slot_id", "==", bookingSlotID)
      .get()
    const bookingIdArray = result.docs.map((docs) => docs.data())
    return bookingIdArray
  }

  public async getBookingsByStripePaymentId(
    stripePaymentId: string
  ): Promise<Booking[]> {
    const result = await FirestoreCollections.bookings
      .where("stripe_payment_id", "==", stripePaymentId)
      .get()
    const stripePaymentIdArray = result.docs.map((docs) => docs.data())
    return stripePaymentIdArray
  }

  // Update
  public async updateBooking(
    bookingslotId: string,
    bookingData: Partial<Booking>
  ) {
    return await FirestoreCollections.bookings
      .doc(bookingslotId)
      .update(bookingData)
  }

  // Delete
  public async deleteBooking(bookingSlotID: string) {
    return await FirestoreCollections.bookings.doc(bookingSlotID).delete()
  }
}

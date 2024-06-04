import { Booking } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"

export default class BookingDataService {
  public async createBooking(bookingData: Booking) {
    return await FirestoreCollections.bookings.add(bookingData)
  }

  /**
   * Fetches all bookings associated with a user ID.
   * @param userId The Firestore user collection ID to retrieve bookings for.
   * @returns All bookings associated with this user.
   */
  public async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const result = await FirestoreCollections.bookings
      .where("user_id", "==", userId)
      .get()
    const bookings = result.docs.map((docs) => docs.data())
    return bookings
  }

  /**
   * Fetches all current bookings associated with a given booking slot ID.
   *
   * @example
   * ```ts
   * const bookings = await BookingDataService.getBookingsBySlotId("/booking_slot/sddsdsdsds")
   * console.log(`There is currently ${bookings.length} users booked that day`)
   * ```
   *
   * @param bookingSlotID The booking slot ID to retrieve all bookings for.
   * @returns All current bookings associated with this slot.
   */
  public async getBookingsBySlotId(bookingSlotID: string): Promise<Booking[]> {
    const result = await FirestoreCollections.bookings
      .where("booking_slot_id", "==", bookingSlotID)
      .get()
    const bookings = result.docs.map((docs) => docs.data())
    return bookings
  }

  /**
   * Fetches the booking associated with a stripe checkout session ID.
   * @param stripeSessionId The Stripe checkout session ID to fetch the booking associated with.
   * @returns The booking made for that Stripe checkout session.
   */
  public async getBookingsByStripeSessionId(
    stripeSessionId: string
  ): Promise<Booking> {
    const result = await FirestoreCollections.bookings
      .where("stripe_payment_id", "==", stripeSessionId)
      .get()
    const bookings = result.docs.map((docs) => docs.data())
    return bookings[0]
  }

  /**
   * Updates an existing booking by modifying a subset of the values.
   * @param bookingId The booking ID to update
   * @param bookingData A partially filled object with which populated keys will be updated to their respective value.
   * @returns The write result.
   */
  public async updateBooking(bookingId: string, bookingData: Partial<Booking>) {
    return await FirestoreCollections.bookings
      .doc(bookingId)
      .update(bookingData)
  }

  /**
   * Deletes an existing booking.
   * @param bookingId The booking ID to delete.
   * @returns The write result.
   */
  public async deleteBooking(bookingId: string) {
    return await FirestoreCollections.bookings.doc(bookingId).delete()
  }
}

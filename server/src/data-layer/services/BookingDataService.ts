import { Booking, BookingSlot } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { DocumentDataWithUid } from "data-layer/models/common"

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

  /**
   *
   * Gets the base availability of a date if the user does not already have a booking on one of the
   * dates and there is still space left. Otherwise returns an array containing undefined objects which
   * should be handled appropriately
   *
   * @param uid the `uid` of the user to check
   * @param datesInBooking a list of `Date` objects, representing each one to check against.
   * @param bookingSlots `bookingSlots` that fall within the date range to be validated
   * @returns an array of objects containing a booking slot id and the corresponding base availability.
   * The presence of an undefined object in the array means that this range is invalid and should be handled
   */
  public async getAvailabilityForUser(
    uid: string,
    datesInBooking: Date[],
    bookingSlots: Array<DocumentDataWithUid<BookingSlot>>
  ) {
    const dates = await Promise.all(
      datesInBooking.map(async (dateToValidate: Date) => {
        // booking slot id and max booking slots
        const { id, max_bookings } = bookingSlots.find(
          (slot) =>
            new Date(slot.date.seconds * 1000).toDateString() ===
            dateToValidate.toDateString()
        )

        const currentBookingsForSlot = await this.getBookingsBySlotId(id)
        const baseAvailability = max_bookings - currentBookingsForSlot.length
        if (
          currentBookingsForSlot.some((booking) => booking.user_id === uid) ||
          baseAvailability <= 0
        ) {
          return undefined
        }
        return { id, baseAvailability }
      })
    )
    return dates
  }
}

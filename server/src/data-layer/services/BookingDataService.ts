import { Booking } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"

export default class BookingDataService {
  // Create
  public async createBooking(bookingData: Booking) {
    return await FirestoreCollections.bookings.add(bookingData)
  }
  // Read
  // Update
  // Delete
}

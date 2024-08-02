import db from "data-layer/adapters/FirestoreCollections"
import {
  DocumentDataWithUid,
  PaginatedFirebaseResponse
} from "data-layer/models/common"
import {
  BookingAddedEvent,
  BookingAvailabilityChangeEvent,
  BookingDeletedEvent,
  BookingHistoryEvent
} from "data-layer/models/firebase"

class BookingHistoryService {
  /**
   * Stores a manual deletion of a booking (by admin) into the booking history collection
   *
   * @param event the required parameters defined by {@link BookingDeletedEvent}
   * @returns the created document
   */
  public async addBookingDeletedEvent(event: BookingDeletedEvent) {
    return await db.bookingHistory.add(event)
  }

  /**
   * Stores a manual creation of a booking (by admin) into the booking history collection
   *
   * @param event the required parameters defined by {@link BookingAddedEvent}
   * @returns the created document
   */
  public async addBookingAddedEvent(event: BookingAddedEvent) {
    return await db.bookingHistory.add(event)
  }

  /**
   * Stores a modification to the booking availability into the booking history collection
   *
   * @param event the required parameters defined by {@link BookingAvailabilityChangeEvent}
   * @returns the created document
   */
  public async addAvailibilityChangeEvent(
    event: BookingAvailabilityChangeEvent
  ) {
    return await db.bookingHistory.add(event)
  }

  /**
   * Fetches the **latest** page of booking history events.
   *
   * @param limit how many history events to fetch, defaults to `100`
   * @param startAfter the firebase document snapshot to paginate from
   * @returns the page of booking history items and a cursor pointing to the
   * last `id` to use for pagination
   */
  public async getAllHistory(
    limit: number = 100,
    startAfter?: FirebaseFirestore.DocumentSnapshot<
      BookingHistoryEvent,
      FirebaseFirestore.DocumentData
    >
  ): Promise<
    PaginatedFirebaseResponse<DocumentDataWithUid<BookingHistoryEvent>>
  > {
    const res = await db.bookingHistory
      .orderBy("timestamp")
      .startAfter(startAfter || 0)
      .limit(limit)
      .get()

    const historyPage: DocumentDataWithUid<BookingHistoryEvent>[] =
      res.docs.map((event) => {
        return { ...event.data(), id: event.id }
      })

    return {
      data: historyPage,
      nextCursor: res.docs[res.docs.length - 1]?.id || undefined
    }
  }
}

export default BookingHistoryService

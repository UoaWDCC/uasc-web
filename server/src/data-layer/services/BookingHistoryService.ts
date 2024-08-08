import { firestoreTimestampToDate } from "data-layer/adapters/DateUtils"
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
import { Timestamp } from "firebase-admin/firestore"

const DEFAULT_PAGINATION_AMOUNT = 100 as const

class BookingHistoryService {
  /**
   * Stores a manual deletion of a booking (by admin) into the booking history collection
   *
   * @param event the required parameters defined by {@link BookingDeletedEvent}
   * @returns the created document reference
   */
  public async addBookingDeletedEvent(event: BookingDeletedEvent) {
    return await db.bookingHistory.add(event)
  }

  /**
   * Stores a manual creation of a booking (by admin) into the booking history collection
   *
   * @param event the required parameters defined by {@link BookingAddedEvent}
   * @returns the created document reference
   */
  public async addBookingAddedEvent(event: BookingAddedEvent) {
    return await db.bookingHistory.add(event)
  }

  /**
   * Stores a modification to the booking availability into the booking history collection
   *
   * @param event the required parameters defined by {@link BookingAvailabilityChangeEvent}
   * @returns the created document reference
   */
  public async addAvailibilityChangeEvent(
    event: BookingAvailabilityChangeEvent
  ) {
    return await db.bookingHistory.add(event)
  }

  /**
   * Returns all history events whose timestamps fall between the given timestamps
   *
   * @param startDate the first date to return history events for
   * @param endDate the last date to return history events for
   * @returns a list of all events that fall between the specified date range
   */
  public async getAllHistoryBetweenDateRange(
    startDate: Timestamp,
    endDate: Timestamp
  ): Promise<DocumentDataWithUid<BookingHistoryEvent>[]> {
    const res = await db.bookingHistory
      .where("timestamp", ">=", firestoreTimestampToDate(startDate))
      .where("timestamp", "<=", firestoreTimestampToDate(endDate))
      .get()

    return res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }
    })
  }

  /**
   * Fetches the **latest** page of booking history events.
   *
   * @param limit how many history events to fetch, defaults to {@link DEFAULT_PAGINATION_AMOUNT}
   * @param startAfter the firebase document snapshot to paginate from
   * @returns the page of booking history items and a cursor pointing to the
   * last `id` to use for pagination
   */
  public async getLatestHistory(
    limit: number = DEFAULT_PAGINATION_AMOUNT,
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

  public async getBookingHistoryEventSnapshot(id: string) {
    return await db.bookingHistory.doc(id).get()
  }
}

export default BookingHistoryService

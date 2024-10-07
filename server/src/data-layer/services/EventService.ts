import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { DocumentDataWithUid } from "data-layer/models/common"
import { Event } from "data-layer/models/firebase"

class EventService {
  /**
   * Creates an event document in Firestore.
   *
   * @param event the event to add to the new document
   * @returns the created document reference
   */
  public async createEvent(event: Event) {
    return await FirestoreCollections.events.add(event)
  }

  /**
   * Fetches existing event document by ID.
   *
   * @param eventId the ID of the event document
   * @returns the event document and their id
   */
  public async getEventById(eventId: string): Promise<Event> {
    const result = await FirestoreCollections.events.doc(eventId).get()

    return result.data()
  }

  /**
   * Fetches all events that have a end_date in the future.
   * Note that "active" means any event that haven't ended yet.
   *
   * @returns a list of events that have a end_date that is later to the current date.
   */
  public async getActiveEvents(): Promise<DocumentDataWithUid<Event>[]> {
    const now = new Date(Date.now())

    const result = await FirestoreCollections.events
      .where("sign_up_end_date", ">", now) // Only get events that have not ended
      .get()

    return result.docs.map((doc) => {
      return { ...(doc.data() as Event), id: doc.id }
    })
  }

  /**
   * Updates an existing event document by ID with new Event data.
   *
   * @param eventId the ID of the event document
   * @param event the new event data to update
   */
  public async updateEvent(eventId: string, event: Partial<Event>) {
    return await FirestoreCollections.events.doc(eventId).update(event)
  }

  /**
   * Deletes an existing event document by ID.
   * Also deletes all reservation docs when deleting an event.
   *
   * @param eventId the ID of the event document
   */
  public async deleteEvent(eventId: string) {
    // Delete main collection doc after deleting reservations
    return await FirestoreCollections.events.doc(eventId).delete()
  }

  /**
   * Utility method for getting the snapshot of a document
   *
   * @param id the document id of the event to check, likely coming from a pagination cursor
   */
  public async getEventSnapshot(id: string) {
    return await FirestoreCollections.events.doc(id).get()
  }

  /**
   * Returns a list of the latest events. Note that "latest" means events with the latest start date.
   *
   * @param limit how many events to fetch
   * @param startAfter snapshot of document which was the last cursor - should
   * fetch using the helper defined as {@link getEventSnapshot}
   * @returns an object providing the id of the next snapshot and list of events
   */
  public async getAllEvents(
    limit: number,
    startAfter?: FirebaseFirestore.DocumentSnapshot<
      Event,
      FirebaseFirestore.DocumentData
    >
  ) {
    let query = FirestoreCollections.events
      // Start at the largest (latest) date
      .orderBy("physical_start_date", "desc")
      .limit(limit)

    if (startAfter) {
      query = query.startAfter(startAfter)
    }

    const res = await query.get()

    const events = res.docs.map((event) => {
      return { ...event.data(), id: event.id }
    })

    return {
      events,
      nextCursor: res.docs[res.docs.length - 1]?.id || undefined
    }
  }
}

export default EventService

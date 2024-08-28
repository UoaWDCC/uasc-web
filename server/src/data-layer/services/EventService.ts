import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { Event } from "data-layer/models/firebase"
import { Timestamp } from "firebase-admin/firestore"

class EventService {
  /**
   * Creates an event document in Firestore.
   *
   * @param event the event to add to the new document
   * @returns the created document reference
   */
  public async createEvent(event: Event) {
    return await FirestoreCollections.events.add({
      ...event,
      start_date: Timestamp.fromMillis(
        event.start_date.seconds * 1000 + event.start_date.nanoseconds / 1000000
      ), // Need to do this because firestore does not like "raw" {seconds, nanoseconds}
      end_date: Timestamp.fromMillis(
        event.end_date.seconds * 1000 + event.end_date.nanoseconds / 1000000
      ) // Need to do this because firestore does not like "raw" {seconds, nanoseconds}
    })
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
   *
   * @param eventId the ID of the event document
   */
  public async deleteEvent(eventId: string) {
    return await FirestoreCollections.events.doc(eventId).delete()
  }
}

export default EventService

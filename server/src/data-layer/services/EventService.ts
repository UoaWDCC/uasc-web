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
  public async getEventById(
    eventId: string
  ): Promise<DocumentDataWithUid<Event>> {
    const result = await FirestoreCollections.events.doc(eventId).get()

    return { ...result.data(), id: result.id }
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

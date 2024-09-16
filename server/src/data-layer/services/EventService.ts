import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import FirestoreSubcollections from "data-layer/adapters/FirestoreSubcollections"
import { DocumentDataWithUid } from "data-layer/models/common"
import { Event, EventReservation } from "data-layer/models/firebase"

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
      .where("end_date", ">", now) // Only get events that have not ended
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
    // Need to delete subcollections under this first
    const snapshot = await FirestoreSubcollections.reservations(eventId).get()
    const deletePromises = snapshot.docs.map((doc) => doc.ref.delete())
    await Promise.all(deletePromises)
    // Delete main collection doc after deleting reservations
    return await FirestoreCollections.events.doc(eventId).delete()
  }

  /**
   * Event reservation collection methods
   */

  /**
   * Adds a reservation to an event.
   *
   * @param eventId the ID of the event document
   * @param reservation the new EventReservation to add
   * @returns the created reservation document reference
   */
  public async addReservation(eventId: string, reservation: EventReservation) {
    return await FirestoreSubcollections.reservations(eventId).add(reservation)
  }

  /**
   * Gets an existing reservation document by ID.
   *
   * @param eventId the ID of the event document
   * @param reservationId the ID of the reservation document
   * @returns the reservation document
   */
  public async getReservationById(
    eventId: string,
    reservationId: string
  ): Promise<EventReservation> {
    const result = await FirestoreSubcollections.reservations(eventId)
      .doc(reservationId)
      .get()

    return result.data()
  }

  /**
   * Gets all reservations for an event.
   * @param eventId the ID of the event document
   * @returns an array of all the event reservation documents
   */
  public async getAllReservations(
    eventId: string
  ): Promise<EventReservation[]> {
    const result = await FirestoreSubcollections.reservations(eventId).get()
    return result.docs.map((doc) => doc.data())
  }

  /**
   * Used for the SSE feature to display the total number of active event reservations.
   * @returns the total number of active event reservations
   */
  public async getActiveReservationsCount(): Promise<number> {
    const currentEvents = await this.getActiveEvents()
    let total = 0
    await Promise.all(
      currentEvents.map(async (event) => {
        const eventReservations = await this.getAllReservations(event.id)
        total += eventReservations.length
      })
    )
    return total
  }

  /**
   * Updates an existing reservation document by ID with new EventReservation data.
   *
   * @param eventId the ID of the event document
   * @param reservationId the ID of the reservation document
   * @param updatedReservation the new EventReservation data to update
   */
  public async updateReservation(
    eventId: string,
    reservationId: string,
    updatedReservation: Partial<EventReservation>
  ) {
    return await FirestoreSubcollections.reservations(eventId)
      .doc(reservationId)
      .update(updatedReservation)
  }

  /**
   * Deletes a reservation from an event.
   *
   * @param eventId the ID of the event document
   * @param reservationId the ID of the reservation document
   */
  public async deleteReservation(eventId: string, reservationId: string) {
    return await FirestoreSubcollections.reservations(eventId)
      .doc(reservationId)
      .delete()
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

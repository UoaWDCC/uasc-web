import { EventReservation, Event } from "data-layer/models/firebase"

export interface EventSignupBody {
  event_id: string
  reservation: EventReservation
}

export interface CreateEventBody {
  data: Event
}

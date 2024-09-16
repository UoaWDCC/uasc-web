import { EventReservation } from "data-layer/models/firebase"

export interface EventSignupBody {
  event_id: string
  reservation: Omit<EventReservation, "timestamp">
}

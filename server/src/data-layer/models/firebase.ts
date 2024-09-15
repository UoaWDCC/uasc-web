import { Timestamp } from "firebase-admin/firestore"

export interface UserAdditionalInfo {
  date_of_birth: Timestamp
  does_snowboarding?: boolean
  does_racing?: boolean
  does_ski?: boolean
  /**
   * @isNumber Please enter your phone number
   */
  phone_number: number
  gender?: string
  /**
   * @isString Please enter a name
   */
  emergency_contact?: string
  /**
   * @isString Please enter your First Name
   */
  first_name: string
  /**
   * @isString Please enter your Second Name
   */
  last_name: string
  /**
   * @isString Please write your dietary requirements
   */
  dietary_requirements: string
  /**
   * **OPTIONAL** field that the user should have the choice to provide
   */
  ethnicity?: string
  /**
   * @isString Please enter your faculty
   */
  faculty?: string
  /**
   * @isString Please enter your university
   */
  university?: string
  /**
   *@isString Please enter your student ID
   */
  student_id?: string
  /**
   * @isString Please enter your year of study
   */
  university_year?: string
  /**
   * For identification DO NOT RETURN to users in exposed endpoints
   */
  stripe_id?: string
}

export interface BookingSlot {
  /**
   * An optional description for this date
   * @example Beginners Weekend
   */
  description?: string
  /**
   * The {@link Timestamp} this booking slot refers to.
   * @example 23 July 2024 at 00:00:00
   */
  date: Timestamp
  /**
   * The maximum number of bookings that can exist on this date
   * @example 30
   */
  max_bookings: number
}

export interface Demographic {
  faculty: string
  gender: string
  second_faculty: string
  student_id: string
  university_year: string
}

export interface UserRequest {
  user_id: string // Reference to user ID (e.g., /users/lVsOjAp06AfD6atT8bnrVEpcdcg2)
  booking_id: string // Reference to booking ID (e.g., /bookings/8mYj7rWOMH6hGy4FzMed)
  query: string
  status: "unresolved" | "resolved" // Status of the query
  creation_time: string // Timestamp (e.g., "1970-01-01T00:00:00Z")
}

export interface Cancellation extends UserRequest {
  query_type: "cancellation"
}

/**
 * @warning Implementors should ensure that the range between
`old_check_out - old_check_in` and `new_check_out` - `new_check_in` do not
differ (i.e., the amount of days in the booking does not change).
 */
export interface DateChange extends UserRequest {
  old_check_in: Timestamp
  old_check_out: Timestamp
  new_check_in: Timestamp
  new_check_out: Timestamp
  query_type: "dateChange" // Possible query types
}

export interface Booking {
  /**
   * The reference to the {@link UserAdditionalInfo} collection ID for the user who made this booking.
   * @example /users/lVsOjAp06AfD6atT8bnrVEpcdcg2
   */
  user_id: string
  /**
   * The reference to the {@link BookingSlot} collection ID that the user is booked under.
   * @exmaple /booking_slot/sddsdsdsds
   */
  booking_slot_id: string
  /**
   * The Stripe payment ID the user made when paying for this booking.
   * @example 'cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u'
   */
  stripe_payment_id: string
}

// Interface for booking changes
export interface BookingChange {
  booking_id: string // Reference to booking ID
  old_check_in: Timestamp // Old check-in timestamp
  old_check_out: Timestamp // Old check-out timestamp
  new_check_in: Timestamp // New check-in timestamp
  new_check_out: Timestamp // New check-out timestamp
}

export interface EventReservation {
  /**
   * The first name of the user who made this event reservation
   */
  first_name: string
  /**
   * The last name of the user who made this event reservation
   */
  last_name: string
  /**
   * The email of the user who made this even reservation
   */
  email: string
  /**
   * Boolean to check if the user is a member
   * @example true
   */
  is_member: boolean
}

export interface Event {
  /**
   * The title of this event
   * @example Snowboarding race!
   */
  title: string
  /**
   * An optional description for this event
   * This should be in markdown
   * @example Come join your friends in this exciting UASC event and race!
   */
  description?: string
  /**
   * The link for the image to display on the event page (essentially a thumbnail)
   */
  image_url?: string
  /**
   * The location of this event
   */
  location: string
  /**
   * The signup period start date.
   * Note that this date is in UTC time.
   * Use the same start and end date to indicate a 1 day signup period.
   */
  start_date: Timestamp
  /**
   * The signup period end date.
   * Note that this date is in UTC time.
   */
  end_date: Timestamp
  /**
   * Max number of attendees at this event, left as optional for uncapped
   * @example 30
   */
  max_occupancy?: number
}

/**
 * Base type to be able to log events that admins perform on booking related resources in the admin view
 */
interface BookingHistory {
  /**
   * The time which the booking operation was performed. MUST be in UTC format
   */
  timestamp: Timestamp

  /**
   * The start of the operated on date range
   */
  start_date: Timestamp

  /**
   * The end of the operated on date range
   */
  end_date: Timestamp

  /**
   * The type of event that the admin performed, used for parsing on the front-end
   *
   * Each of these are associated with the following:
   *
   * - `"added_user_to_booking"`: {@link BookingAddedEvent}
   * - `"removed_user_from_booking"`: {@link BookingDeletedEvent}
   * - `"changed_date_availability"`: {@link BookingAvailabilityChangeEvent}
   */
  event_type:
    | "added_user_to_booking"
    | "removed_user_from_booking"
    | "changed_date_availability"
}

/**
 * Event used to track a user being **manually** added to a booking (only possible via admin view)
 *
 * @extends BookingHistory {@link BookingHistory}
 */
export interface BookingAddedEvent extends BookingHistory {
  /**
   * The id corresponding to the user who had a **manually** added booking
   */
  uid: string
  event_type: "added_user_to_booking"
}

/**
 * Event used to track the removal of a user from a date range (only possible via admin view)
 *
 * @extends BookingHistory {@link BookingHistory}
 */
export interface BookingDeletedEvent extends BookingHistory {
  /**
   * The id corresponding to the user who had a **manually** deleted booking
   */
  uid: string
  event_type: "removed_user_from_booking"
}

/**
 * Event used to track the history of the availability of dates changing
 *
 * @extends BookingHistory {@link BookingHistory}
 */
export interface BookingAvailabilityChangeEvent extends BookingHistory {
  /**
   * The **signed** difference between the newly available slots and the previously available slots.
   *
   * For example, if the original available slots was 32, and the availability was set to 0,
   * the `change` in the slots needs to be **0 - 32 = -32**
   *
   * And vice versa, if the original available slots was 16, and the availability was set to 32,
   * the `change` would be **32 - 16 = 16**
   */
  change: number
  event_type: "changed_date_availability"
}

/**
 * Helper type to specify the possible datastruces for the booking history
 */
export type BookingHistoryEvent =
  | BookingAddedEvent
  | BookingDeletedEvent
  | BookingAvailabilityChangeEvent

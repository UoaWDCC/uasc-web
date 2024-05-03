import { Timestamp } from "firebase-admin/firestore"

export interface UserAdditionalInfo {
  date_of_birth: Timestamp
  /**
   * @isbool Please enter true or false
   */
  does_freestyle: boolean
  /**
   * @isbool Please enter true or false
   */
  does_racing: boolean
  /**
   * @isbool Please enter true or false
   */
  does_ski: boolean
  /**
   * @isString Please enter your pronouns
   */
  gender: string
  /**
   * @isString Please enter a name
   */
  emergency_name: string
  /**
   * @isString Please type in your Phone Number
   */
  emergency_phone: string
  /**
   * @isString Please enter a name
   */
  emergency_relation: string
  /**
   * @isString Please enter your First Name
   */
  first_name: string
  /**
   * @isString Please enter your Second Name
   */
  last_name: string
  /**
   * @isString Please enter either Admin or Member or Guest
   */
  membership: "admin" | "member" | "guest"
  /**
   * @isString Please write your dietary requirements
   */
  dietary_requirements: string
  /**
   * @isString Please enter your faculty
   */
  faculty: string | undefined
  /**
   * @isString Please enter your university
   */
  university: string | undefined
  /**
   *@isString Please enter your student ID
   */
  student_id: string | undefined
  /**
   * @isbool Please enter true or false
   */
  returning: boolean
  /**
   * @isString Please enter your year of study
   */
  university_year: string
  /**
   * For identification DO NOT RETURN to users in exposed endpoints
   */
  stripe_id?: string
}

export interface BookingSlot {
  /**
   * The Stripe [product ID](https://docs.stripe.com/api/products) that must get purchased to pay for this booking.
   * @example "prod_NWjs8kKbJWmuuc"
   */
  stripe_product_id: string
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

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
  product_id: string
  active: boolean
  display_price: number
  name: string
  description: string
  start_date: Timestamp
  end_date: Timestamp
  max_bookings: number
  remaining_spots: number
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
  user_id: string // Reference to user ID
  booking_slot_id: string // Reference
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

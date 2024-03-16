import { Timestamp } from "firebase-admin/firestore"

export interface UserAdditionalInfo {
  date_of_birth: Timestamp // Assuming this is a timestamp
  does_freestyle: boolean
  does_racing: boolean
  does_ski: boolean
  emergency_name: string
  emergency_phone: string
  emergency_relation: string
  first_name: string
  last_name: string
  membership: "admin" | "member"
  dietary_requirements: string | undefined
  faculty: string | undefined
  university: string | undefined
  student_id: string | undefined
  returning: boolean
  university_year: string | undefined
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
}

// Interface for booking changes
export interface BookingChange {
  booking_id: string // Reference to booking ID
  old_check_in: Timestamp // Old check-in timestamp
  old_check_out: Timestamp // Old check-out timestamp
  new_check_in: Timestamp // New check-in timestamp
  new_check_out: Timestamp // New check-out timestamp
}

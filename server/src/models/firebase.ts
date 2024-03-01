export interface UserAdditionalInfo {
  date_of_birth: Date // Assuming this is a timestamp
  does_freestyle: boolean
  does_racing: boolean
  does_ski: boolean
  emergency_name: string
  emergency_phone: string
  emergency_relation: string
  first_name: string
  last_name: string
  membership: "admin" | "member"
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
  query_type: "cancellation" | "dateChange" // Possible query types
  status: "unresolved" | "resolved" // Status of the query
  creation_time: string // Timestamp (e.g., "1970-01-01T00:00:00Z")
}

export interface Cancellation extends UserRequest {}

/**
 * @warning Implementors should ensure that the range between
`old_check_out - old_check_in` and `new_check_out` - `new_check_in` do not
differ (i.e., the amount of days in the booking does not change).
 */
export interface DateChange extends UserRequest {
  old_check_in: Date
  old_check_out: Date
  new_check_in: Date
  new_check_out: Date
}

export interface Booking {
  user_id: string // Reference to user ID
  check_in: Date // Timestamp for check-in
  check_out: Date // Timestamp for check-out
}

// Interface for booking changes
export interface BookingChange {
  booking_id: string // Reference to booking ID
  old_check_in: Date // Old check-in timestamp
  old_check_out: Date // Old check-out timestamp
  new_check_in: Date // New check-in timestamp
  new_check_out: Date // New check-out timestamp
}

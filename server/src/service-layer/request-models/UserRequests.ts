import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import { Timestamp } from "firebase-admin/firestore"
import { UserRecord } from "firebase-admin/lib/auth/user-record"

export interface EditUsersRequestBody {
  users: { uid: string; updatedInformation: Partial<UserAdditionalInfo> }[]
}

export interface CreateUserRequestBody {
  uid: string
  user: UserAdditionalInfo
}

export interface SelfRequestModel {
  user?: UserRecord
}

export interface DeleteUserRequestBody {
  uid: string
}

export interface UserPaymentRequestModel {
  membershipType?: MembershipTypeValues
}

export interface UserBookingRequestingModel {
  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  startDate?: Timestamp
  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  endDate?: Timestamp
}

export interface EditSelfRequestModel {
  user: { uid: string }
}

export interface EditSelfRequestBody {
  updatedInformation: Omit<Partial<UserAdditionalInfo>, "stripe_id">
}

// promote/demote users - ticket 202
export interface PromoteUserRequestBody {
  uid: string
}

export interface DemoteUserRequestBody {
  uid: string
}

export interface AvailableDatesRequestModel {
  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  startDate?: Timestamp
  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  endDate?: Timestamp
}

/**
 * Represents the structure of a request model for fetching bookings within a specific date range.
 */
export interface BookingsByDateRangeRequestModel {
  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  startDate: Timestamp
  /**
   * Firestore timestamp, should represent a UTC date that is set to exactly midnight
   */
  endDate: Timestamp
}

export interface CreateBookingsRequestModel
  extends BookingsByDateRangeRequestModel {
  /**
   * List of users to add to the bookings between date range
   */
  userId: string
}

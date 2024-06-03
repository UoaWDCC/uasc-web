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

// ticket 341 client select membership type
export interface UserMembershipRequestModel {
  membershipType: MembershipTypeValues
}
// ticket 129 - Booking checkout session
export interface UserBookingRequestingModel {
  startDate: Timestamp
  endDate: Timestamp
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
  startDate?: Timestamp
  endDate?: Timestamp
}

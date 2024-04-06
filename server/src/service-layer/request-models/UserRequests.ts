import { UserAdditionalInfo } from "data-layer/models/firebase"
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

export interface EditSelfRequestModel {
  user: { uid: string }
}

export interface EditSelfRequestBody {
  updatedInformation: Omit<Partial<UserAdditionalInfo>, "membership">
}

// promote/demote users - ticket 202
export interface PromoteUserRequestBody {
  uid: string
}

export interface DemoteUserRequestBody {
  uid: string
}

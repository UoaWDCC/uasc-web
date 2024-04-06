import { UserAdditionalInfo } from "data-layer/models/firebase"
import { UserRecord } from "firebase-admin/lib/auth/user-record"

export interface EditUsersRequestBody {
  users: { uid: string; updatedInformation: UserAdditionalInfo }[]
}

export interface CreateUserRequestBody {
  uid: string
  user: UserAdditionalInfo
}

export interface SelfRequestModel {
  user?: UserRecord
}

export interface EditSelfRequestModel {
  user: UserRecord
  updatedInformation: UserAdditionalInfo
}

// promote/demote users - ticket 202
export interface PromoteUserRequestBody {
  uid: string
}

export interface DemoteUserRequestBody {
  uid: string
}

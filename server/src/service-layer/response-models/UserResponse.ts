import { FirebaseProperties } from "data-layer/models/common"
import { UserAdditionalInfo } from "data-layer/models/firebase"

export type UserResponse = UserAdditionalInfo & FirebaseProperties

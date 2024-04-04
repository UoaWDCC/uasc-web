import { UserAdditionalInfo } from "data-layer/models/firebase"

export interface UserSignupBody {
  email: string
  user: UserAdditionalInfo
}

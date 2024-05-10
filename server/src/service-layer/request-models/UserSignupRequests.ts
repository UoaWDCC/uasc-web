import { UserAdditionalInfo } from "data-layer/models/firebase"

export interface UserSignupBody {
  email: string
  user: Omit<UserAdditionalInfo, "stripe_id">
}

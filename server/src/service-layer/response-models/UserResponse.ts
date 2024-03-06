import { UserAdditionalInfo } from "data-layer/models/firebase"

export type User = Omit<UserAdditionalInfo, "date_of_birth"> & {
  date_of_birth: Date
}

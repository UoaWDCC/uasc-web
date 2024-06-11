import { UserRecord } from "firebase-admin/lib/auth/user-record"

export interface AllUserBookingsRequestBody {
  user?: UserRecord
}

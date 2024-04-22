import { UserAdditionalInfo } from "data-layer/models/firebase"
import { MembershipType } from "../utils/MembershipType"

export default class PricingService {
  public getMembershipType(user: UserAdditionalInfo): MembershipType {
    if (user.university && user.returning && user.student_id !== undefined) {
      return MembershipType.UoaReturning
    } else if (
      user.university &&
      !user.returning &&
      user.student_id !== undefined
    ) {
      return MembershipType.UoaNew
    } else if (user.returning) {
      return MembershipType.OtherReturning
    } else {
      return MembershipType.OtherNew
    }
  }
}

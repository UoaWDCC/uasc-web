import { UserAdditionalInfo } from "data-layer/models/firebase"
import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"

export default class PricingService {
  public getMembershipType(user: UserAdditionalInfo): MembershipTypeValues {
    if (user.university && user.returning && user.student_id !== undefined) {
      return MembershipTypeValues.UoaReturning
    } else if (
      user.university &&
      !user.returning &&
      user.student_id !== undefined
    ) {
      return MembershipTypeValues.UoaNew
    } else if (user.returning) {
      return MembershipTypeValues.OtherReturning
    } else {
      return MembershipTypeValues.OtherNew
    }
  }
}

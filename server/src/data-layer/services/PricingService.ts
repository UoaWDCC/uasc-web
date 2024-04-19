import { UserAdditionalInfo } from "data-layer/models/firebase"
import { MembershipType } from "./membershipType"

export default class PricingService {
  public async getMembershipType(
    user: UserAdditionalInfo
  ): Promise<MembershipType> {
    if (user.university && user.returning) {
      return MembershipType.UoaReturning
    } else if (user.university && !user.returning) {
      return MembershipType.UoaNew
    } else if (!user.university && user.returning) {
      return MembershipType.OtherReturning
    } else {
      return MembershipType.OtherNew
    }
  }
}

import { memberUserInfoMock } from "test-config/mocks/User.mock"
import PricingService from "./PricingService"
import { MembershipType } from "./MembershipType"

describe("pricingService unit tests", () => {
  let pricingServiceTest: PricingService

  beforeEach(() => {
    pricingServiceTest = new PricingService()
  })

  it("should return UOA returning membership type if user is from UOA and returning", async () => {
    const membershipType =
      await pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipType.UoaReturning)
  })

  it("should return Other new membership type if user is not from UOA and not returning", async () => {
    memberUserInfoMock.university = ""
    memberUserInfoMock.returning = false

    const membershipType =
      await pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipType.OtherNew)
  })

  it("should return Other returning membership type if user is not from UOA and returning", async () => {
    memberUserInfoMock.university = ""
    memberUserInfoMock.returning = true

    const membershipType =
      await pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipType.OtherReturning)
  })

  it("should return UOA new membership type if user is from UOA and not returning", async () => {
    memberUserInfoMock.university = "11299211"
    memberUserInfoMock.returning = false

    const membershipType =
      await pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipType.UoaNew)
  })
})

import { memberUserInfoMock } from "test-config/mocks/User.mock"
import PricingService from "./PricingService"
import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"

describe("pricingService unit tests", () => {
  let pricingServiceTest: PricingService

  beforeEach(() => {
    pricingServiceTest = new PricingService()
  })

  it("should return UOA returning membership type if user is from UOA and returning", async () => {
    const membershipType =
      pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.UoaReturning)
  })

  it("should return Other new membership type if user is not from UOA and not returning", async () => {
    memberUserInfoMock.university = ""
    memberUserInfoMock.returning = false

    const membershipType =
      pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.OtherNew)
  })

  it("should return Other returning membership type if user is not from UOA and returning", async () => {
    memberUserInfoMock.university = ""
    memberUserInfoMock.returning = true

    const membershipType =
      pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.OtherReturning)
  })

  it("should return UOA new membership type if user is from UOA and not returning", async () => {
    memberUserInfoMock.university = "uoa"
    memberUserInfoMock.returning = false

    const membershipType =
      pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.UoaNew)
  })

  it("should return correct membership type when student_id is undefined", async () => {
    memberUserInfoMock.university = "uoa"
    memberUserInfoMock.returning = true
    memberUserInfoMock.student_id = undefined

    const membershipType =
      pricingServiceTest.getMembershipType(memberUserInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.OtherReturning)
  })
})

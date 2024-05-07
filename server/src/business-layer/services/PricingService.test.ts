import { userInfoMock } from "test-config/mocks/User.mock"
import PricingService from "./PricingService"
import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"

describe("pricingService unit tests", () => {
  let pricingServiceTest: PricingService

  beforeEach(() => {
    pricingServiceTest = new PricingService()
  })

  it("should return UOA returning membership type if user is from UOA and returning", async () => {
    const membershipType = pricingServiceTest.getMembershipType(userInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.UoaReturning)
  })

  it("should return Other new membership type if user is not from UOA and not returning", async () => {
    userInfoMock.university = ""
    userInfoMock.returning = false

    const membershipType = pricingServiceTest.getMembershipType(userInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.OtherNew)
  })

  it("should return Other returning membership type if user is not from UOA and returning", async () => {
    userInfoMock.university = ""
    userInfoMock.returning = true

    const membershipType = pricingServiceTest.getMembershipType(userInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.OtherReturning)
  })

  it("should return UOA new membership type if user is from UOA and not returning", async () => {
    userInfoMock.university = "uoa"
    userInfoMock.returning = false

    const membershipType = pricingServiceTest.getMembershipType(userInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.UoaNew)
  })

  it("should return correct membership type when student_id is undefined", async () => {
    userInfoMock.university = "uoa"
    userInfoMock.returning = true
    userInfoMock.student_id = undefined

    const membershipType = pricingServiceTest.getMembershipType(userInfoMock)

    expect(membershipType).toEqual(MembershipTypeValues.OtherReturning)
  })
})

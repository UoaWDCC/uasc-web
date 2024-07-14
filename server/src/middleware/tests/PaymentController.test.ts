import { cleanFirestore } from "test-config/TestUtils"
import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"
import {
  request,
  createUsers,
  adminToken,
  memberToken,
  guestToken
} from "../routes.setup"
import { GUEST_USER_UID, createUserData } from "../routes.mock"

describe("PaymentController endpoint tests", () => {
  describe("/payments", () => {
    beforeEach(async () => {
      await createUsers()
    })
    afterEach(async () => {
      await cleanFirestore()
    })
    describe("/booking", () => {
      // rest of functionality is handled in other unit tests
      it("should only let members call the endpoint", async () => {
        let res = await request
          .post("/payment/booking")
          .set("Authorization", `Bearer ${guestToken}`)
          .send({ startDate: { seconds: 0, nanoseconds: 0 } })

        expect(res.status).toEqual(401)

        res = await request
          .post("/payment/booking")
          .send({ seconds: 0, nanoseconds: 0 })

        expect(res.status).toEqual(401)
      })
    })
    describe("/membership", () => {
      it("should not let members to try create sessions", async () => {
        const res = await request
          .post("/payment/membership")
          .set("Authorization", `Bearer ${memberToken}`)
          .send({
            membershipType: MembershipTypeValues.UoaStudent
          })

        expect(res.status).toEqual(409)
      })

      it("should let guests/admins to try create sessions", async () => {
        createUserData(GUEST_USER_UID)
        let res = await request
          .post("/payment/membership")
          .set("Authorization", `Bearer ${guestToken}`)
          .send({
            membershipType: MembershipTypeValues.NewNonStudent
          })
        expect(res.status).toEqual(200)

        /**
         * Note admins should be able to create sessions for testing purposes, it is assumed that admin users will not try pay
         */
        res = await request
          .post("/payment/membership")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            membershipType: MembershipTypeValues.UoaStudent
          })
        expect(res.status).toEqual(200)
      })
    })
  })
})

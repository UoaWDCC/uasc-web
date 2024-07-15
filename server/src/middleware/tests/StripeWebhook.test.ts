import AuthService from "business-layer/services/AuthService"
import { cleanFirestore, cleanAuth } from "test-config/TestUtils"
import { GUEST_USER_UID } from "../routes.mock"

import { request, createUsers } from "../routes.setup"

describe("StripeWebhook endpoint tests", () => {
  describe("/webhook", () => {
    beforeAll(async () => {
      await cleanFirestore()
      await cleanAuth()
      await createUsers()
    })
    afterAll(async () => {
      await cleanFirestore()
      await cleanAuth()
    })
    it("should add claim to user upon successful checkout", async () => {
      const res = await request
        .post("/webhook")
        .set("stripe-signature", "test")
        .send({
          test: "foo"
        })
      expect(res.status).toEqual(200)
      const userClaims = await new AuthService().getCustomerUserClaim(
        GUEST_USER_UID
      )
      expect(userClaims).toEqual({ member: true })
    })
  })
})

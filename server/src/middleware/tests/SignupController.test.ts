import { request } from "../routes.setup"
import { signupUserMock } from "test-config/mocks/User.mock"
import AuthService from "business-layer/services/AuthService"

describe("SignupController endpoint tests", () => {
  describe("/signup", () => {
    it("should return a JWT token for guest /signup POST endpoint", async () => {
      const res = await request.post("/signup").send({
        email: "test@mail.com",
        user: signupUserMock
      })
      expect(res.status).toEqual(200)
      // check if user custom claims exist
      const { uid } = res.body
      const claims = await new AuthService().getCustomerUserClaim(uid)
      expect(claims).toEqual(undefined)
    })
    it("should return a 409 conflict when an email is already in use", async () => {
      let res = await request.post("/signup").send({
        email: "test@mail.com",
        user: signupUserMock
      })
      expect(res.status).toEqual(200)

      res = await request.post("/signup").send({
        email: "test@mail.com",
        user: signupUserMock
      })
      // check for conflict
      expect(res.status).toEqual(409)
    })
    it("should return a jwtToken with no claims", async () => {
      const res = await request.post("/signup").send({
        email: "testadmin@mail.com",
        user: signupUserMock
      })
      expect(res.status).toEqual(200)
      // check if user custom claims exist
      const claims = await new AuthService().getCustomerUserClaim(res.body.uid)
      expect(claims).toEqual(undefined)
    })
  })
})

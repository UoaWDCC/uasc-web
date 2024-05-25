import "dotenv/config"
import { _app } from "../index"
import { cleanFirestore, cleanAuth } from "test-config/TestUtils"
import supertest from "supertest"
import UserDataService from "data-layer/services/UserDataService"
import {
  ADMIN_USER_UID,
  GUEST_USER_UID,
  MEMBER_USER_UID,
  createUserData,
  createUserWithClaim,
  deleteUsersFromAuth
} from "./routes.mock"

import {
  checkoutSessionMock,
  customerMock,
  productMock
} from "test-config/mocks/Stripe.mock"
import { signupUserMock } from "test-config/mocks/User.mock"
import AuthService from "business-layer/services/AuthService"
import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"

const request = supertest(_app)

/**
 * This needs to be updated as we add more stripe functions...
 */
jest.mock("stripe", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        customers: {
          create: () => {
            return { id: "test" }
          }
        },
        products: {
          search: () => {
            return { data: [productMock] }
          }
        },
        checkout: {
          sessions: {
            create: () => {
              return { client_secret: "test" }
            },
            list: () => {
              return {
                data: [checkoutSessionMock]
              }
            }
          }
        },
        webhooks: {
          constructEvent: () => {
            return {
              type: "payment_intent.succeeded",
              data: {
                object: {
                  customer: customerMock
                }
              }
            }
          }
        }
      }
    })
  }
})

const usersToCreate: string[] = [
  ADMIN_USER_UID,
  MEMBER_USER_UID,
  GUEST_USER_UID
]

const createUsers = async () => {
  await Promise.all(
    usersToCreate.map(async (uid) => {
      await createUserData(uid)
    })
  )
}

describe("Endpoints", () => {
  let adminToken: string | undefined
  let memberToken: string | undefined
  let guestToken: string | undefined

  beforeEach(async () => {
    adminToken = await createUserWithClaim(ADMIN_USER_UID, "admin")
    memberToken = await createUserWithClaim(MEMBER_USER_UID, "member")
    guestToken = await createUserWithClaim(GUEST_USER_UID)
  })

  afterEach(async () => {
    await deleteUsersFromAuth(usersToCreate)
  })

  afterAll(async () => {
    _app.close()
  })

  describe("admin/users", () => {
    it("Should get users for admin", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
        .expect(200, done)
    })
    it("Should not allow members to get users", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})
        .expect(401, done)
    })
    it("Should not allow guests to get users", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})
        .expect(401, done)
    })
    describe("/self", () => {
      afterEach(async () => {
        await cleanFirestore()
      })
      it("Should not allow members to fetch their own stripe id", async () => {
        await createUserData(MEMBER_USER_UID)
        const res = await request
          .get("/users/self")
          .set("Authorization", `Bearer ${memberToken}`)
          .send({})

        expect(res.body.stripe_id).toBe(undefined)
      })
    })
  })

  /**
   *
   * `/Payments`
   *
   */
  describe("/payments", () => {
    beforeEach(async () => {
      await createUsers()
    })
    afterEach(async () => {
      await cleanFirestore()
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

  describe("/admin/users/promote and /admin/users/demote", () => {
    beforeEach(async () => {
      await createUsers()
    })

    afterEach(async () => {
      await cleanFirestore()
    })
    it("Should allow admins to promote regular users", (done) => {
      request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
        .expect(200, done)
    })
    it("Should allow admins to demote regular users", (done) => {
      request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
        .expect(200, done)
    })
    it("Should not allow admins to demote/promote admins", async () => {
      let res
      res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res.status).toEqual(403) // forbidden

      res = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res.status).toEqual(403) // forbidden
    })

    it("Should not allow guests/members to use demote/promote", async () => {
      let res
      res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res.status).toEqual(401) // unauthorised

      res = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res.status).toEqual(401) // unauthorised
    })

    it("Should check for conflicts, e.g. already member/guest", async () => {
      let res
      res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res.status).toEqual(409) // conflict

      res = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res.status).toEqual(409) // conflict
    })
  })

  describe("users/edit-self", () => {
    beforeEach(async () => {
      await createUserData(ADMIN_USER_UID)
      await createUserData(MEMBER_USER_UID)
      await createUserData(GUEST_USER_UID)
    })

    afterEach(async () => {
      await cleanFirestore()
    })
    it("should edit the users information", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ updatedInformation: { gender: "male" } })

      expect(res.status).toEqual(200) // success
      const updatedUser = await new UserDataService().getUserData(
        ADMIN_USER_UID
      )
      expect(updatedUser.gender).toEqual("male")
    })

    it("should edit the user information for multiple attributes", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          updatedInformation: { does_ski: true, university_year: "4th" }
        })

      expect(res.status).toEqual(200) // success
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.does_ski).toEqual(true)
      expect(updatedUser.university_year).toEqual("4th")
    })

    it("should not edit users stripe_id for multiple attributes", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          updatedInformation: {
            faculty: "arts",
            gender: "two spirit",
            stripe_id: "my fake stripe id"
          }
        })

      expect(res.status).toEqual(400) // invalid request
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.stripe_id).not.toEqual("my fake stripe id")
    })

    it("should not be able to put invalid domain into attribute", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ updatedInformation: { does_ski: "invalid" } })

      expect(res.status).toEqual(400) // invalid request
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.does_ski).not.toEqual("invalid")
    })
  })
  /**
   *
   * `/signup`
   *
   */
  describe("/signup", () => {
    afterEach(async () => {
      await cleanFirestore()
      await cleanAuth()
    })
    it("should return a JWT token for guest /signup POST endpoint", async () => {
      const res = await request.post("/signup").send({
        email: "test@mail.com",
        user: signupUserMock
      })
      // ensure that response is 200
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
    it("should return no claims jwtToken", async () => {
      // console.log({ ...signupUserMock, membership: "admin" })
      const res = await request.post("/signup").send({
        email: "testadmin@mail.com",
        user: signupUserMock
      })
      // ensure that response is 200
      expect(res.status).toEqual(200)
      // check if user custom claims exist
      const { uid } = res.body
      const claims = await new AuthService().getCustomerUserClaim(uid)
      expect(claims).toEqual(undefined)
    })
  })
  /**
   *
   * `/webhook`
   *
   */
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

import "dotenv/config"
import { _app } from "../index"
import { cleanFirestore } from "test-config/TestUtils"
import supertest from "supertest"
import UserDataService from "data-layer/services/UserDataService"
import {
  ADMIN_USER_UID,
  GUEST_USER_UID,
  MEMBER_USER_UID,
  createUserData,
  createUserWithClaim,
  deleteUsersFromAuth,
  userToCreate
} from "./routes.mock"

const request = supertest(_app)

const usersToCreate: userToCreate[] = [
  { uid: ADMIN_USER_UID, membership: "admin" },
  { uid: MEMBER_USER_UID, membership: "member" },
  { uid: GUEST_USER_UID, membership: "guest" }
]

const createUsers = async () => {
  await Promise.all(
    usersToCreate.map(async (user) => {
      const { uid, membership } = user
      await createUserData(uid, membership)
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
    const uidsToDelete = usersToCreate.map((user) => {
      const { uid } = user
      return uid
    })
    await deleteUsersFromAuth(uidsToDelete)
  })

  afterAll(async () => {
    await _app.close()
  })

  describe("/Users", () => {
    it("Should get users for admin", (done) => {
      request
        .get("/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
        .expect(200, done)
    })
    it("Should not allow members to get users", (done) => {
      request
        .get("/users")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})
        .expect(401, done)
    })
    it("Should not allow guests to get users", (done) => {
      request
        .get("/users")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})
        .expect(401, done)
    })
    describe("/self", () => {
      afterEach(async () => {
        await cleanFirestore()
      })
      it("Should not allow members to fetch their own stripe id", async () => {
        await createUserData(MEMBER_USER_UID, "member")
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
          .get("/payment/membership")
          .set("Authorization", `Bearer ${memberToken}`)
          .send({})

        expect(res.status).toEqual(409)
      })

      it("should let guests/admins to try create sessions", async () => {
        let res = await request
          .get("/payment/membership")
          .set("Authorization", `Bearer ${guestToken}`)
          .send({})
        expect(res.status).toEqual(200)

        /**
         * Note admins should be able to create sessions for testing purposes, it is assumed that admin users will not try pay
         */
        res = await request
          .get("/payment/membership")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({})
        expect(res.status).toEqual(200)
      })
    })
  })

  describe("/users/promote and /users/demote", () => {
    beforeEach(async () => {
      await createUsers()
    })

    afterEach(async () => {
      await cleanFirestore()
    })
    it("Should allow admins to promote regular users", (done) => {
      request
        .put("/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
        .expect(200, done)
    })
    it("Should allow admins to demote regular users", (done) => {
      request
        .put("/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
        .expect(200, done)
    })
    it("Should not allow admins to demote/promote admins", async () => {
      let res
      res = await request
        .put("/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res.status).toEqual(403) // forbidden

      res = await request
        .put("/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res.status).toEqual(403) // forbidden
    })

    it("Should not allow guests/members to use demote/promote", async () => {
      let res
      res = await request
        .put("/users/promote")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res.status).toEqual(401) // unauthorised

      res = await request
        .put("/users/demote")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res.status).toEqual(401) // unauthorised
    })

    it("Should check for conflicts, e.g. already member/guest", async () => {
      let res
      res = await request
        .put("/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res.status).toEqual(409) // conflict

      res = await request
        .put("/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res.status).toEqual(409) // conflict
    })
  })

  describe("/users/edit-self", () => {
    beforeEach(async () => {
      await createUserData(ADMIN_USER_UID, "admin")
      await createUserData(MEMBER_USER_UID, "member")
      await createUserData(GUEST_USER_UID, "guest")
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

    it("should not edit the users role", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ updatedInformation: { membership: "admin" } })

      expect(res.status).toEqual(400) // invalid request
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.membership).toEqual("member")
      expect(updatedUser.membership).not.toEqual("admin")
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

    it("should not edit users role for multiple attributes", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          updatedInformation: {
            faculty: "arts",
            gender: "two spirit",
            membership: "admin"
          }
        })

      expect(res.status).toEqual(400) // invalid request
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.membership).toEqual("member")
      expect(updatedUser.membership).not.toEqual("admin")
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
})

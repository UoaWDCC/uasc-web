import "dotenv/config"
import { _app } from "../index"
import { cleanFirestore } from "test-config/TestUtils"
import supertest from "supertest"
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

describe("Endpoints", () => {
  let adminToken: string | undefined
  let memberToken: string | undefined
  let guestToken: string | undefined

  beforeAll(async () => {
    adminToken = await createUserWithClaim(ADMIN_USER_UID, "admin")
    memberToken = await createUserWithClaim(MEMBER_USER_UID, "member")
    guestToken = await createUserWithClaim(GUEST_USER_UID)
  })

  afterAll(async () => {
    const uidsToDelete = usersToCreate.map((user) => {
      const { uid } = user
      return uid
    })
    await _app.close()
    await deleteUsersFromAuth(uidsToDelete)
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
  })

  describe("/users/promote and /users/demote", () => {
    beforeEach(async () => {
      await Promise.all(
        usersToCreate.map(async (user) => {
          const { uid, membership } = user
          await createUserData(uid, membership)
        })
      )
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
        .send({ uid: GUEST_USER_UID })
        .expect(200, done)
    })
    it("Should not allow admins to demote/promote admins", async () => {
      await request
        .put("/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
        .expect(403)

      await request
        .put("/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
        .expect(403)
    })
    it("Should not allow guests/members to use demote/promote", async () => {
      await request
        .put("/users/promote")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({ uid: GUEST_USER_UID })
        .expect(401) // unauthorised
      await request
        .put("/users/demote")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID })
        .expect(401) // unauthorised
    })
    it("Should check for conflicts, e.g. already member/guest", async () => {
      await request
        .put("/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
        .expect(409) // conflict

      await request
        .put("/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
        .expect(409) // conflict
    })
  })
})

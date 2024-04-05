import "dotenv/config"
import supertest from "supertest"
import { _app } from "../index"
import { auth } from "business-layer/security/Firebase"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithCustomToken,
  connectAuthEmulator
} from "firebase/auth"
import {
  EMULATOR_AUTH_PORT,
  EMULATOR_HOST,
  EMULATOR_PROJECT_ID
} from "data-layer/adapters/EmulatorConfig"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"

const ADMIN_USER_UID = "admin-user"
const MEMBER_USER_ID = "member-user"
const GUEST_USER_ID = "guest-user"

const clientFirebase = initializeApp({
  projectId: EMULATOR_PROJECT_ID,
  apiKey: process.env.API_KEY
})
const clientAuth = getAuth(clientFirebase)
connectAuthEmulator(clientAuth, `http://${EMULATOR_HOST}:${EMULATOR_AUTH_PORT}`)
const request = supertest(_app)

const createUserWithClaim = async (
  uid: string,
  claim?: typeof AuthServiceClaims.ADMIN | typeof AuthServiceClaims.MEMBER
) => {
  await auth.createUser({ uid })
  if (claim) {
    await auth.setCustomUserClaims(uid, { [claim]: true })
  }

  const customToken = await auth.createCustomToken(uid)
  const { user } = await signInWithCustomToken(clientAuth, customToken)
  return await user.getIdToken()
}

describe("Endpoints", () => {
  let adminToken: string | undefined
  let memberToken: string | undefined
  let guestToken: string | undefined

  beforeAll(async () => {
    // Create admin user token
    adminToken = await createUserWithClaim(ADMIN_USER_UID, "admin")

    // Create member user token
    memberToken = await createUserWithClaim(MEMBER_USER_ID, "member")

    // Create guest user token
    guestToken = await createUserWithClaim(GUEST_USER_ID)
  })

  afterAll(async () => {
    _app.close()
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

    it("Should not allow guests", (done) => {
      request
        .get("/users")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})
        .expect(401, done)
    })
  })
})

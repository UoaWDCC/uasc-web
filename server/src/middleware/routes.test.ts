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
import { EMULATOR_PROJECT_ID } from "data-layer/adapters/EmulatorConfig"

const ADMIN_USER_UID = "admin-user"
// const MEMBER_USER_ID = "member-user"
// const GUEST_USER_ID = "guest-user"

const clientFirebase = initializeApp({
  projectId: EMULATOR_PROJECT_ID,
  apiKey: process.env.API_KEY
})
const clientAuth = getAuth(clientFirebase)
connectAuthEmulator(clientAuth, "http://localhost:9099")
const request = supertest(_app)

describe("Users endpoint", () => {
  let adminToken: string | undefined
  //  memberToken: string | undefined,
  //  guestToken: string | undefined

  beforeAll(async () => {
    await auth.createUser({ uid: ADMIN_USER_UID })
    await auth.setCustomUserClaims(ADMIN_USER_UID, { admin: true })

    const customToken = await auth.createCustomToken(ADMIN_USER_UID)
    const { user } = await signInWithCustomToken(clientAuth, customToken)
    adminToken = await user.getIdToken()
  })

  afterEach(async () => {
    _app.close()
  })

  it("Should get users", (done) => {
    request
      .get("/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({})
      .expect(200, done)
  })
})

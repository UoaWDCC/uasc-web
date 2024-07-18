import { auth } from "business-layer/security/Firebase"
import AuthService from "./AuthService"
import { UserRecord } from "firebase-admin/auth"
import { cleanAuth } from "test-config/TestUtils"
import { AuthServiceClaims, UserAccountTypes } from "../utils/AuthServiceClaims"

describe("AuthService Integration Tests", () => {
  afterEach(async () => {
    await cleanAuth()
  })

  it("fetches all users", async () => {
    for (let i = 0; i < 1002; i++) {
      await auth.createUser({ uid: `${i}` })
    }
    const users = await new AuthService().getAllUsers()
    expect(users.length).toBe(1002)
  })

  it("deletes a user", async () => {
    await auth.createUser({ uid: "test" })
    new AuthService().deleteUser("test")
    let user
    try {
      user = await auth.getUser("test")
    } catch {}
    expect(user).toBe(undefined)
  })

  it("creates a user", async () => {
    const createdUser = await new AuthService().createUser("test@gmail.com")
    let user
    try {
      user = await auth.getUser(createdUser.uid)
    } catch {}
    expect(createdUser).toEqual(user)
    expect(user.email).toEqual("test@gmail.com")
  })

  it("sets custom claim on a user", async () => {
    const authService: AuthService = new AuthService()
    let createdUser: UserRecord =
      await authService.createUser("test3@gmail.com")

    try {
      await authService.setCustomUserClaim(createdUser.uid, "member")
    } catch {}

    // refresh user record to get access to newly added custom claim
    createdUser = await auth.getUser(createdUser.uid)

    expect(createdUser.customClaims.member).not.toBe(undefined)
  })

  it("fetches custom claim on a user", async () => {
    const authService: AuthService = new AuthService()
    const createdUser: UserRecord =
      await authService.createUser("test3@mail.com")

    try {
      await authService.setCustomUserClaim(createdUser.uid, "member")
    } catch {}

    const customerClaim = await authService.getCustomerUserClaim(
      createdUser.uid
    )
    expect(customerClaim).toEqual({ member: true })
  })

  it("create custom token", async () => {
    const authService: AuthService = new AuthService()
    const createdUser = await new AuthService().createUser("test4@gmail.com")

    // Set role on user
    await authService.setCustomUserClaim(createdUser.uid, "member")

    const customerClaims = await authService.getCustomerUserClaim(
      createdUser.uid
    )
    const token = await new AuthService().createCustomToken(
      createdUser.uid,
      customerClaims
    )

    expect(typeof token).toBe("string")
  })

  it("can bulk fetch under 100 users", async () => {
    const authService: AuthService = new AuthService()
    const uidsToQuery = []
    for (let i = 0; i < 5; ++i) {
      const { uid } = await new AuthService().createUser(`test${i}@gmail.com`)
      uidsToQuery.push({ uid })
    }

    const result = await authService.bulkRetrieveUsersByUids(uidsToQuery)

    expect(result.length).toEqual(5)
  })

  it("doesn't error out/return invalid uids", async () => {
    const authService: AuthService = new AuthService()
    const uidsToQuery = [{ uid: "inVALID" }, { uid: "invalid" }]
    for (let i = 0; i < 5; ++i) {
      const { uid } = await new AuthService().createUser(`test${i}@gmail.com`)
      uidsToQuery.push({ uid })
    }

    const result = await authService.bulkRetrieveUsersByUids(uidsToQuery)

    expect(result.length).toEqual(5)
  })

  it("returns admin membership for admin claims", async () => {
    const authService: AuthService = new AuthService()
    const customClaims = { [AuthServiceClaims.ADMIN]: true }
    const membership = authService.getMembershipType(customClaims)
    expect(membership).toEqual(UserAccountTypes.ADMIN)
  })

  it("returns member membership for member claims", async () => {
    const authService: AuthService = new AuthService()
    const customClaims = { [AuthServiceClaims.MEMBER]: true }
    const membership = authService.getMembershipType(customClaims)
    expect(membership).toEqual(UserAccountTypes.MEMBER)
  })

  it("returns guest membership for no claims", async () => {
    const authService: AuthService = new AuthService()
    const customClaims = {}
    const membership = authService.getMembershipType(customClaims)
    expect(membership).toEqual(UserAccountTypes.GUEST)
  })
})

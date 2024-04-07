import { auth } from "business-layer/security/Firebase"
import AuthService from "./AuthService"
import { UserRecord } from "firebase-admin/auth"

describe("AuthService Integration Tests", () => {
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
    let createdUser: UserRecord = await authService.createUser("test2@mail.com")

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
})

import { UserRecord } from "firebase-admin/auth"
import { auth } from "business-layer/security/Firebase"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"

export default class AuthService {
  /**
   * Deletes a user account from the Firebase Authentication Service.
   * @param uid
   */
  public async deleteUser(uid: string): Promise<void> {
    try {
      await auth.deleteUser(uid)
    } catch (err) {
      console.error("Error deleting user", err)
      throw err
    }
  }

  /**
   * Creates a new user account in the Firebase Authentication Service.
   * @param email
   */
  public async createUser(email: string): Promise<UserRecord> {
    // get the user record
    let userRecord: UserRecord
    try {
      userRecord = await auth.createUser({ email })
    } catch (err) {
      console.error("Error creating user", err)
      throw err
    }

    return userRecord
  }

  public async createCustomToken(uid: string, claims: { [key: string]: any }) {
    let token: string
    try {
      token = await auth.createCustomToken(uid, claims)
    } catch (err) {
      console.error("Error creating custom token", err)
      throw err
    }
    return token
  }

  /**
   * Sets a customers claim as target role in the Firebase Authentication Service.
   * @param uid
   * @param role
   */
  public async setCustomUserClaim(
    uid: string,
    role:
      | typeof AuthServiceClaims.MEMBER
      | typeof AuthServiceClaims.ADMIN
      | null
  ) {
    let userRecord: UserRecord
    try {
      userRecord = await auth.getUser(uid)
      auth.setCustomUserClaims(
        userRecord.uid,
        role === null ? null : { [role]: true }
      )
    } catch (err) {
      console.error("Error setting custom claim on user", err)
      throw err
    }
  }

  /**
   * Fetches custom user claims from a target uid in the Firebase Authentication Service.
   * @param uid
   */
  public async getCustomerUserClaim(uid: string) {
    let userRecord: UserRecord
    try {
      userRecord = await auth.getUser(uid)
    } catch (err) {
      console.error("Error fetching custom claim on user")
      throw err
    }
    return userRecord.customClaims
  }
}

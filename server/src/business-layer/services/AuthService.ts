import { UserRecord } from "firebase-admin/auth"
import { auth } from "business-layer/security/Firebase"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"

type UidArray = {
  uid: string
}[]

export default class AuthService {
  /**
   * Fetches up to **100** users based on an array of uid identifiers
   *
   * @throws **Passing more than 100 will result in a FirebaseAuthError**
   *
   * @param uids an array of objects containing the key `uid`,
   * which has the value of the firebase user uid
   * @example // [{uid:"uid1", uid:"uid2"}]
   */
  public async bulkRetrieveUsersByUids(uids: UidArray) {
    try {
      const { users } = await auth.getUsers(uids)
      return users
    } catch (e) {
      console.error(`Failed to bulk retrieve the uids from Auth`, e)
      return undefined
    }
  }

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

  /**
   * Creates a custom token for a user to sign in with
   * @param uid identifier for the user
   * @param claims claims that the token should have
   * @returns the custom token
   */
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
   * @param uid The Firestore user ID
   * @param role The claim to add, or if `null`, will delete all existing claims.
   */
  public async setCustomUserClaim(
    uid: string,
    role: (typeof AuthServiceClaims)[keyof typeof AuthServiceClaims] | null
  ) {
    try {
      const userRecord = await auth.getUser(uid)
      auth.setCustomUserClaims(
        userRecord.uid,
        role === null ? null : { [role]: true }
      )
    } catch (err) {
      console.error(`Error setting custom claim '${role}' on user '${uid}'`)
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

import { UserRecord } from "firebase-admin/auth"
import { auth } from "business-layer/security/Firebase"

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
   * @param args
   * @param claimRole
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
}

import { UserRecord, getAuth } from "firebase-admin/auth"
import { AuthServiceClaims } from "./AuthServiceClaims"
import { auth } from "business-layer/security/Firebase"

export default class AuthService {
  /**
   * Deletes a user account from the Firebase Authentication Service.
   * @param uid
   */
  public async deleteUser(uid: string): Promise<void> {
    try {
      await auth.deleteUser(uid)
    } catch (error) {}
  }

  /**
   * Creates a new user account in the Firebase Authentication Service.
   * @param args
   * @param claimRole
   */
  public async createUser(
    email: string,
    claimRole: string = AuthServiceClaims.MEMBER
  ): Promise<UserRecord> {
    // get the user record
    let userRecord: UserRecord
    try {
      userRecord = await getAuth().createUser({ email })
    } catch (err) {
      console.error("Error creating user", err)
      throw err
    }

    return userRecord
  }
}

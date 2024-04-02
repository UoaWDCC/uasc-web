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

    // set custom claim on user account
    const userUid: string = userRecord.uid
    getAuth()
      .setCustomUserClaims(userUid, { [claimRole]: true })
      .then(() => {})
      .catch((err) => {
        console.error("Error setting custom claim on user", err)
        throw err
      })

    // generate password reset email link
    const userEmail: string = userRecord.email
    getAuth()
      .generatePasswordResetLink(userEmail)
      .then((link) => {
        // do smth with the link
      })
      .catch((err) => {
        console.error("Error sending password reset link", err)
        throw err
      })

    return userRecord
  }
}

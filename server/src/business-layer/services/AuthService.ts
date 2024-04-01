import { UserRecord, getAuth } from "firebase-admin/auth"
import { Timestamp } from "firebase-admin/firestore"
import { AuthServiceClaims } from "./AuthServiceClaims"

interface createUserArgs {
  email: string
  displayName: string
  photoURL: string
  dateOfBirth: Timestamp
  doesFreestyle: boolean
  doesRacing: boolean
  doesSnowboarding: boolean
  doesSki: boolean
  gender: string
  emergencyName: string
  emergencyPhone: string
  emergencyRelation: string
  firstName: string
  lastName: string
  membership: "admin" | "member"
  dietaryRequirements: string
  faculty: string | undefined
  university: "UoA" | string | undefined
  studentId: string | undefined
  returning: boolean
  universityYear: string
}

export default class AuthService {
  /**
   * Deletes a user account from the Firebase Authentication Service.
   * @param uid
   */
  public async deleteUser(uid: string): Promise<void> {
    getAuth()
      .deleteUser(uid)
      .then(() => {})
      .catch((err) => {
        console.error("Error deleting user", err)
        throw err
      })
  }

  /**
   * Creates a new user account in the Firebase Authentication Service.
   * @param args
   * @param claimRole
   */
  public async createUser(
    args: createUserArgs,
    claimRole: string = AuthServiceClaims.MEMBER
  ): Promise<UserRecord> {
    // get the user record
    const userRecord: UserRecord = await getAuth()
      .createUser({})
      .then((userRecord: UserRecord) => userRecord)
      .catch((err) => {
        console.error("Error creating user", err)
        throw err
      })

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

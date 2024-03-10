import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { UserAdditionalInfo } from "data-layer/models/firebase"

export default class UserDataService {
  // Create
  /**
   * Note this is different from creating a user in firebase auth, which should be handled in the business-layer
   *
   * @param uid
   * @param additionalInfo
   */
  public async createUserData(uid: string, additionalInfo: UserAdditionalInfo) {
    await FirestoreCollections.users.doc(uid).set(additionalInfo)
  }

  // Read
  public async getAllUserData() {
    const res = await FirestoreCollections.users.get()
    const users = res.docs.map((user) => {
      return { ...user.data(), uid: user.id }
    })
    return users
  }

  public async getUserData(uid: string) {
    const userDoc = await FirestoreCollections.users.doc(uid).get()
    return { ...userDoc.data(), uid }
  }

  public async getFilteredUsers(filters: Partial<UserAdditionalInfo>) {
    // TODO
  }

  // Update
  public async editUserData(
    uid: string,
    updatedFields: Partial<UserAdditionalInfo>
  ) {
    await FirestoreCollections.users
      .doc(uid)
      .set(updatedFields, { merge: true })
  }

  // Delete
  public async deleteUserData(uid: string) {
    await FirestoreCollections.users.doc(uid).delete()
  }
}

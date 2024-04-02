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
    const data = userDoc.data()
    if (data === undefined) return undefined
    return { ...userDoc.data(), uid }
  }

  public async userDataExists(uid: string) {
    const snapshot = await FirestoreCollections.users.doc(uid).get()
    return snapshot.exists
  }

  public async getFilteredUsers(filters: Partial<UserAdditionalInfo>) {
    let users: FirebaseFirestore.Query<
      UserAdditionalInfo,
      FirebaseFirestore.DocumentData
    > = FirestoreCollections.users
    if (filters.membership) {
      users = users.where("membership", "==", filters.membership)
    } else if (filters.first_name) {
      users = users.where("first_name", "==", filters.first_name)
    } else if (filters.last_name) {
      users = users.where("last_name", "==", filters.last_name)
    }
    const snapshot = await users.get()
    const fileteredUsers = snapshot.docs.map((user) => {
      return { ...user.data(), uid: user.id }
    })
    return fileteredUsers
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

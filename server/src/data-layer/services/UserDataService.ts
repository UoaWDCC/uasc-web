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

  /**
   * Retrieves a list of filtered users based on the provided filters.
   *
   * @param filters - An object containing the filters to apply on the users.
   * @returns filteredUsers - A promise that resolves to an array of filtered users.
   */
  public async getFilteredUsers(filters: Partial<UserAdditionalInfo>) {
    let users: FirebaseFirestore.Query<
      UserAdditionalInfo,
      FirebaseFirestore.DocumentData
    > = FirestoreCollections.users

    /** Apply filters to the query based on the provided filter properties */
    if (filters.membership) {
      users = users.where("membership", "==", filters.membership)
    } else if (filters.first_name) {
      users = users.where("first_name", "==", filters.first_name)
    } else if (filters.last_name) {
      users = users.where("last_name", "==", filters.last_name)
    }

    /** Execute the query and retrieve the snapshot */
    const snapshot = await users.get()

    /** Map the snapshot documents to an array of filtered users */
    const filteredUsers = snapshot.docs.map((user) => {
      return { ...user.data(), uid: user.id }
    })

    return filteredUsers
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

import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { UserAdditionalInfo } from "data-layer/models/firebase"
// import * as console from "console"

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

  /**
   * @param [limit] how many users to fetch at once
   * @param [startAfter] the cursor to start searching for users at
   * @returns list of users, sorted by first name *and* the next cursor
   */
  public async getAllUserData(
    limit: number = 100,
    startAfter?: FirebaseFirestore.DocumentSnapshot<
      UserAdditionalInfo,
      FirebaseFirestore.DocumentData
    >
  ) {
    // is ordered by id by default
    const res = await FirestoreCollections.users
      .orderBy("first_name")
      .startAfter(startAfter || 0)
      .limit(limit)
      .get()

    const users = res.docs.map((user) => {
      return { ...user.data(), uid: user.id }
    })
    return { users, nextCursor: res.docs[res.docs.length - 1]?.id || undefined }
  }

  public async getUserDocumentSnapshot(uid: string) {
    return await FirestoreCollections.users.doc(uid).get()
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
    if (filters.first_name) {
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

  /**
   * Retrieves user documents from Firestore based on the provided user IDs.
   */
  public async getUsersByIds(userIds: string[]) {
    if (userIds.length === 0) {
      return []
    }

    const userDocs = await Promise.all(
      userIds.map((id) => FirestoreCollections.users.doc(id).get())
    )

    const users = userDocs
      .filter((doc) => doc.exists)
      .map((doc) => ({ ...doc.data(), uid: doc.id}))
    return users
  }
}

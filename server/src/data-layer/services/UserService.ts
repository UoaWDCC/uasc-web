import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { UserAdditionalInfo } from "data-layer/models/firebase"

export default class UserService {
  // Create
  public async addUser(uid: string, additionalInfo: UserAdditionalInfo) {
    await FirestoreCollections.users.doc(uid).set(additionalInfo)
  }

  // Read
  public async getUsers() {
    const res = await FirestoreCollections.users.get()
    const users = res.docs.map((user) => {
      return user.data()
    })
    return users
  }

  public async getUser(uid: string) {
    const userDoc = await FirestoreCollections.users.doc(uid).get()
    return userDoc.data()
  }

  public async getFilteredUsers(filters: Partial<UserAdditionalInfo>) {
    // TODO
  }

  // Update
  public async editUser(
    uid: string,
    updatedFields: Partial<UserAdditionalInfo>
  ) {
    await FirestoreCollections.users
      .doc(uid)
      .set(updatedFields, { merge: true })
  }

  // Delete
  public async deleteUser(uid: string) {
    await FirestoreCollections.users.doc(uid).delete()
  }
}

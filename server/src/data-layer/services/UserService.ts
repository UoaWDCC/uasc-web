import { db } from "data-layer/adapters/FirestoreCollections"
import { UserAdditionalInfo } from "data-layer/models/firebase"

export default class UserService {
  // Create
  public async addUser(uid: string, additionalInfo: UserAdditionalInfo) {
    await db.users.doc(uid).set(additionalInfo)
  }

  // Read
  public async getUsers() {
    const res = await db.users.get()
    const users = res.docs.map((user) => {
      return user.data()
    })
    return users
  }

  public async getUser(uid: string) {
    const userDoc = await db.users.doc(uid).get()
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
    await db.users.doc(uid).set(updatedFields, { merge: true })
  }

  // Delete
  public async deleteUser(uid: string) {
    await db.users.doc(uid).delete()
  }
}

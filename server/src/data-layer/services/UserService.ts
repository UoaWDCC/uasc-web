import { UsersCollection } from "data-layer/adapters/FirestoreCollections"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore"

export default class UserService {
  // Create
  public async addUser(uid: string, additionalInfo: UserAdditionalInfo) {
    await setDoc(doc(UsersCollection, uid), additionalInfo)
  }

  // Read
  public async getUsers() {
    const res = await getDocs(UsersCollection)
    const users = res.docs.map((user) => {
      return user.data()
    })
    return users
  }

  public async getUser(uid: string) {
    const userDoc = await getDoc(doc(UsersCollection, uid))
    return userDoc.data()
  }

  public async getFilteredUsers(filters: Partial<UserAdditionalInfo>) {
    let q = query(UsersCollection)
    for (const filter of Object.keys(filters)) {
      const field = filter as keyof UserAdditionalInfo
      q = query(q, where(filter, "==", filters[field]))
    }
    const filteredUsers = await getDocs(q)
    return filteredUsers
  }

  // Update
  public async editUser(
    uid: string,
    updatedFields: Partial<UserAdditionalInfo>
  ) {
    const userRef = doc(UsersCollection, uid)
    await updateDoc(userRef, updatedFields)
  }

  // Delete
  public async deleteUser(uid: string) {
    const userRef = await doc(UsersCollection, uid)
    await deleteDoc(userRef)
  }
}

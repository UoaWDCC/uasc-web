// credit https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
import "dotenv/config"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import { admin } from "business-layer/security/Firebase"

const converter = <T>() => ({
  toFirestore: (data: any) => data,
  fromFirestore: (doc: any) => doc.data() as T
})

export const firestore = Object.assign(
  () => {
    return admin.firestore()
  },
  {
    doc: <T>(path: string) => {
      return admin.firestore().doc(path).withConverter<T>(converter<T>())
    },
    collection: <T>(path: string) => {
      return admin.firestore().collection(path).withConverter<T>(converter<T>())
    }
  }
)

export const db = {
  users: firestore.collection<UserAdditionalInfo>("users")
} as const

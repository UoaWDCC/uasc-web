import { admin } from "business-layer/security/Firebase"

const converter = <T>() => ({
  toFirestore: (data: any) => data,
  fromFirestore: (doc: any) => doc.data() as T
})

const firestore = Object.assign(
  () => {
    return admin.firestore()
  },
  {
    doc: <T>(path: string) => {
      return admin.firestore().doc(path).withConverter<T>(converter<T>())
    },
    collection: <T>(path: string) => {
      return admin.firestore().collection(path).withConverter<T>(converter<T>())
    },
    subcollection: <T>(path: string, docId: string, subpath: string) => {
      return admin
        .firestore()
        .collection(path) // The main collection
        .doc(docId) // The document
        .collection(subpath) // The sub collection
        .withConverter<T>(converter<T>())
    }
  }
)

export default firestore

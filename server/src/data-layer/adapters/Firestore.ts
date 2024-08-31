import { admin } from "business-layer/security/Firebase"

const converter = <T>() => ({
  toFirestore: (data: any) => data,
  fromFirestore: (doc: any) => doc.data() as T
})

/**
 * Firestore adapter for the application.
 */
const firestore = Object.assign(
  () => {
    return admin.firestore()
  },
  {
    doc: <T>(path: string) => {
      return admin.firestore().doc(path).withConverter<T>(converter<T>())
    },
    /**
     * Collection adapter for Firestore.
     * @param path The path to the collection.
     * @returns The collection adapter.
     */
    collection: <T>(path: string) => {
      return admin.firestore().collection(path).withConverter<T>(converter<T>())
    },
    /**
     * Subcollection adapter for Firestore.
     * @param path The path to the main collection.
     * @param docId The document ID from the main collection to retrieve.
     * @param subpath The path to the subcollection.
     * @returns The subcollection adapter.
     */
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

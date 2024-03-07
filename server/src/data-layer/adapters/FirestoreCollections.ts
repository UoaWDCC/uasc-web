// credit https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
import "dotenv/config"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
  connectFirestoreEmulator
} from "firebase/firestore"
import { USERS_COLLECTION } from "./CollectionNames"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./FirestoreConfig"
import {
  EMULATOR_FIRESTORE_PORT,
  EMULATOR_HOST,
  EMULATOR_PROJECT_ID
} from "./EmulatorConfig"

if (process.env.DEV || process.env.JEST_WORKER_ID !== undefined) {
  initializeApp({ projectId: EMULATOR_PROJECT_ID })
} else {
  initializeApp(firebaseConfig)
}

export const firestore = getFirestore()

if (process.env.DEV || process.env.JEST_WORKER_ID !== undefined) {
  connectFirestoreEmulator(firestore, EMULATOR_HOST, EMULATOR_FIRESTORE_PORT)
}

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

export const UsersCollection =
  createCollection<UserAdditionalInfo>(USERS_COLLECTION)

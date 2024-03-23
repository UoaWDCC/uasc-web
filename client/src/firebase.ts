// setup firebase
import { initializeApp, type FirebaseOptions } from "@firebase/app"
import { getAuth, connectAuthEmulator } from "@firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore"
import { StoreInstance } from "store/store"

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// use emulator suite if running locally
if (import.meta.env.VITE_NODE_ENV !== "production") {
  connectFirestoreEmulator(db, "localhost", 8080)
  connectAuthEmulator(auth, "http://localhost:9099")
}

auth.onIdTokenChanged((user) => {
  StoreInstance.actions.setCurrentUser(user)
})

export { auth, db }

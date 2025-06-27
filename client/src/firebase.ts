// setup firebase
import { initializeApp, type FirebaseOptions } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { type ParsedToken, getAuth } from "firebase/auth"
import {
  type EventNameString,
  type EventParams,
  getAnalytics,
  logEvent,
  isSupported,
  type Analytics
} from "firebase/analytics"
import type { UserClaims } from "@/models/User"
import { setToken } from "@/services/OpenApiFetchClient"
import { StoreInstance } from "@/store/Store"
import { MembershipPaymentStore } from "@/store/MembershipPayment"
import queryClient from "@/services/QueryClient"
import { BOOKING_AVAILABLITY_KEY } from "@/services/Booking/BookingQueries"
import { MEMBERSHIP_CLIENT_SECRET_KEY } from "@/services/Payment/PaymentQueries"
import { getStorage } from "firebase/storage"

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
let analytics: Analytics | null = null

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app)
  }
})

// use emulator suite if running locally
if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
  connectFirestoreEmulator(db, "localhost", 8080)
}

auth.onIdTokenChanged(async (user) => {
  MembershipPaymentStore.actions.resetMembershipType()

  if (user === null) {
    // suggests a log out
    queryClient.resetQueries({
      queryKey: [BOOKING_AVAILABLITY_KEY, MEMBERSHIP_CLIENT_SECRET_KEY]
    })
    StoreInstance.actions.resetCurrentUserState()
    return
  }

  // fetch token
  let token: string, claims: ParsedToken
  try {
    ;({ token, claims } = await user.getIdTokenResult())
  } catch (error) {
    console.error(`Failed to handle auth token change: ${error}`)
    return
  }

  // update fetch client token to use
  setToken(token)

  StoreInstance.actions.setCurrentUser(user, claims as UserClaims)
})

export const fireAnalytics = (
  eventName: EventNameString,
  eventParams?: EventParams
) => {
  if (analytics) {
    logEvent(analytics, eventName as string, eventParams)
  }
}

export { auth, db, analytics, storage }

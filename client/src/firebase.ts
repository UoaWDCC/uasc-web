// setup firebase
import { initializeApp, type FirebaseOptions } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { ParsedToken, getAuth } from "firebase/auth"
import {
  EventNameString,
  EventParams,
  getAnalytics,
  logEvent
} from "firebase/analytics"
import { UserClaims } from "models/User"
import { setToken } from "services/OpenApiFetchClient"
import { StoreInstance } from "store/Store"
import { MembershipPaymentStore } from "store/MembershipPayment"
import queryClient from "services/QueryClient"
import { BOOKING_AVAILABLITY_KEY } from "services/Booking/BookingQueries"
import { MEMBERSHIP_CLIENT_SECRET_KEY } from "services/Payment/PaymentQueries"

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app)

// use emulator suite if running locally
if (import.meta.env.VITE_NODE_ENV !== "production") {
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
  logEvent(analytics, eventName as string, eventParams)
}

export { auth, db, analytics }

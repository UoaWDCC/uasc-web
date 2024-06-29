import admin from "firebase-admin"
import dotenv from "dotenv"
import { initializeApp } from "firebase/app"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  )
})

const app = initializeApp({
  apiKey: process.env.API_KEY,
  projectId: "uasc-ceebc"
})
const auth = getAuth(app)

const resetAllPasswords = async () => {
  const firebaseUsers = await admin.auth().listUsers()
  console.log("found user count", firebaseUsers.users.length)
  for (const user of firebaseUsers.users) {
    if (user.customClaims && !user.customClaims.admin) {
      console.log(`Sending password reset for ${user.email}`)
      await sendPasswordResetEmail(auth, user.email)
    }
  }
}

resetAllPasswords()

console.log("exited script")

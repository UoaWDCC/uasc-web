import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config()

/**
 * Credit John Chen
 *
 * How to use:
 * ```
 * ts-node ./test/scripts/loginScript // to log in with admin using the UID defined in .env
 *
 * ts-node ./test/scripts/loginScript mdLy2GYwTMZovNtnkj121dWU2YP2 admin // to login with admin
 *
 * ts-node ./test/scripts/loginScript mdLy2GYwTMZovNtnkj121dWU2YP2 // to login without admin
 * ```
 */

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  )
})

const createIdToken = async (uid: string, makeUserAdmin: boolean) => {
  try {
    if (makeUserAdmin) {
      await admin.auth().setCustomUserClaims(uid, { member: true, admin: true })
    } else {
      await admin.auth().setCustomUserClaims(uid, { admin: false })
    }

    const customToken = await admin.auth().createCustomToken(uid)

    const res = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.API_KEY}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: customToken,
          returnSecureToken: true
        })
      }
    )

    const data = (await res.json()) as any
    console.log("\nAuthorization Header:")
    console.log(data.idToken)

    return data.idToken
  } catch (e) {
    console.log(e)
  }
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log("Login with env User ID as admin:", process.env.USER_ID)
  createIdToken(process.env.USER_ID, true)
} else if (args.length === 2 && args[1] === "admin") {
  console.log("Login with User ID as admin:", args[0])
  createIdToken(args[0], true)
} else {
  console.log("Login with User ID without admin:", args[0])
  createIdToken(args[0], false)
}

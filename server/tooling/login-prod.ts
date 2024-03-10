import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config()

/**
 * Credit John Chen
 *
 * How to use:
 * ```
 * ts-node ./test/scripts/loginScript <USER_UID>
 *
 * ts-node ./test/scripts/loginScript mdLy2GYwTMZovNtnkj121dWU2YP2
 * ```
 */

admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

const createIdToken = async (uid: string) => {
  try {
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
    console.log("Bearer " + data.idToken)

    return data.idToken
  } catch (e) {
    console.log(e)
  }
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log("Login with User ID:", process.env.USER_ID)
  createIdToken(process.env.USER_ID)
} else {
  console.log("Login with User ID:", args[0])
  createIdToken(args[0])
}

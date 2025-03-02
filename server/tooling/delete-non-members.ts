import { CombinedUserData } from "service-layer/response-models/UserResponse"

import admin from "firebase-admin"
import dotenv from "dotenv"

dotenv.config()

// Environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
const USER_ID = "google-sheets-bot"

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON))
})

/**
 * Fetches users from the backend
 * @param token - The token to authenticate the request
 * @param cursor - The cursor to fetch the next page of users
 * @returns The data json object from the response
 */
async function fetchUsers(token: string, cursor?: string): Promise<any> {
  const res = await fetch(
    // Note that VITE_BACKEND_BASE_URL does have a slash at the end
    `${BASE_URL}admin/users${cursor ? `?cursor=${cursor}` : ""}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`
      }
    }
  )
  if (res.status === 200) {
    const data = await res.json()
    return data
  } else {
    throw new Error(`Failed to fetch users, status: ${res.status}`)
  }
}

/**
 * Fetches all users from the backend
 * @param token - The token to authenticate the request
 * @returns An array of CombinedUserData
 */
async function getAllUsers(token: string): Promise<CombinedUserData[]> {
  const allUsers: CombinedUserData[] = []
  let fetchedUsers = await fetchUsers(token)
  allUsers.push(...fetchedUsers.data)
  while (fetchedUsers.nextCursor) {
    fetchedUsers = await fetchUsers(token, fetchedUsers.nextCursor)
    allUsers.push(...fetchedUsers.data)
  }
  return allUsers
}

/**
 * Code from login-prod.ts to create admin jwt token
 * @param uid - The user id to create the token for
 * @returns The jwt token
 */
const createIdToken = async () => {
  try {
    // Ensure that the user exists
    try {
      await admin.auth().getUser(USER_ID)
    } catch (e) {
      await admin.auth().createUser({ uid: USER_ID })
    }
    await admin
      .auth()
      .setCustomUserClaims(USER_ID, { member: true, admin: true })

    const customToken = await admin.auth().createCustomToken(USER_ID)
    const res = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${API_KEY}`,
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

    return data.idToken
  } catch (e) {
    console.error(e)
  }
}

/**
 * Updates the google sheet with members fetched from backend
 * @param token - The token to authenticate the request
 */
async function main() {
  const token = await createIdToken()
  const allUsers: CombinedUserData[] = (await getAllUsers(token)).filter(
    (user) => user.membership === "member"
  )

  console.log(allUsers)
}

main()

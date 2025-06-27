import dotenv from "dotenv"
import admin from "firebase-admin"

import { google, type sheets_v4 } from "googleapis"
import type { CombinedUserData } from "service-layer/response-models/UserResponse"
import { firestoreTimestampToDate } from "../src/data-layer/adapters/DateUtils"

dotenv.config()

// Environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
const MEMBERS_GOOGLE_SPREADSHEET_ID = process.env.MEMBERS_GOOGLE_SPREADSHEET_ID
const MEMBERS_GOOGLE_SHEET_ID = process.env.MEMBERS_GOOGLE_SHEET_ID
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
const USER_ID = "google-sheets-bot"

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON))
})

const categories = [
  "Email",
  "First name",
  "Last name",
  "UPI",
  "Phone number",
  "Date of birth",
  "Membership",
  "Date joined",
  "University year",
  "Gender",
  "Does racing",
  "Does ski",
  "Does snowboarding",
  "Emergency contact",
  "Dietary requirements",
  "Has Whakapapa season pass",
  "UID"
]

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
    return await res.json()
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
 * Creates google authentication client
 * @returns The google auth client
 */
async function authenticateGoogle(): Promise<any> {
  const { client_email, private_key } = JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON)
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  return await auth.getClient()
}

/**
 * Append data to Google Sheets using API Key
 * @param auth - The google auth client
 * @param rows - The rows to append to the Google Sheet
 * @returns The response from the Google Sheets API
 */
async function updateGoogleSheet(auth: any, rows: any[]) {
  const sheets = google.sheets({
    version: "v4",
    auth
  })

  interface GAPIRequest
    extends sheets_v4.Params$Resource$Spreadsheets$Values$Append {
    resource: any
  }

  const request: GAPIRequest = {
    spreadsheetId: MEMBERS_GOOGLE_SPREADSHEET_ID,
    // Sheet id is something like "Sheet1"
    range: MEMBERS_GOOGLE_SHEET_ID + "!A1",
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
    resource: {
      values: rows
    }
  }

  try {
    const response = (await sheets.spreadsheets.values.append(request)).data
    console.log(`${rows.length} rows added to the google sheet.`)
    return response
  } catch (err) {
    return console.error("Failed to add rows to the google sheet.", err)
  }
}

/**
 * Clears google sheet data.
 * @param auth - The google auth client
 */
async function clearSheet(auth: any) {
  const sheets = google.sheets({
    version: "v4",
    auth
  })

  const request = {
    spreadsheetId: MEMBERS_GOOGLE_SPREADSHEET_ID,
    range: MEMBERS_GOOGLE_SHEET_ID
  }
  try {
    await sheets.spreadsheets.values.clear(request)
    console.log(`Cleared google sheet.`)
  } catch (err) {
    console.error("Failed to clear the Google Sheet", err)
  }
}

/**
 * Converts user information to an array that google sheets can parse.
 * @param users An array of all CombinedUserData
 * @returns The mapper user arrays
 */
function mapUsers(users: CombinedUserData[]) {
  return users.map((user: CombinedUserData) => [
    user.email,
    user.first_name,
    user.last_name,
    user.student_id,
    user.phone_number,
    firestoreTimestampToDate(user.date_of_birth).toLocaleString([], {
      timeZone: "Pacific/Auckland",
      hour12: true
    }),
    user.membership,
    user.dateJoined,
    user.university_year,
    user.gender,
    user.does_racing,
    user.does_ski,
    user.does_snowboarding,
    user.emergency_contact,
    // Remove stripe id from fields
    user.dietary_requirements,
    user.has_whakapapa_season_pass,
    user.uid
  ])
}

/**
 * Code from login-prod.ts to create admin jwt token
 * @returns The jwt token
 */
const createIdToken = async () => {
  try {
    // Ensure that the user exists
    try {
      await admin.auth().getUser(USER_ID)
    } catch {
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
 */
async function updateGoogleSheetMembers() {
  const token = await createIdToken()
  const allUsers: CombinedUserData[] = (await getAllUsers(token)).filter(
    (user) => user.membership === "member"
  )
  const rows = mapUsers(allUsers)
  const auth = await authenticateGoogle()
  await clearSheet(auth) // Clear sheet first
  await updateGoogleSheet(auth, [categories, ...rows])
}

updateGoogleSheetMembers()

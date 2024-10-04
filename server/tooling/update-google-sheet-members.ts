import { CombinedUserData } from "service-layer/response-models/UserResponse"
import { firestoreTimestampToDate } from "data-layer/adapters/DateUtils"

import { google } from "googleapis"
import dotenv from "dotenv"
dotenv.config()

const args = process.argv.slice(2)

/**
 * Fetches users from the backend
 * @param token - The token to authenticate the request
 * @param cursor - The cursor to fetch the next page of users
 * @returns The data json object from the response
 */
async function fetchUsers(token: string, cursor?: string): Promise<any> {
  const res = await fetch(
    // Note that VITE_BACKEND_BASE_URL does have a slash at the end
    `${process.env.VITE_BACKEND_BASE_URL}admin/users${cursor ? `?cursor=${cursor}` : ""}`,
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
 * @returns An array of all users
 */
async function getAllUsers(token: string): Promise<CombinedUserData[]> {
  const allUsers: CombinedUserData[] = []
  let fetchedUsers = await fetchUsers(token)
  allUsers.push(...fetchedUsers.data)
  while (fetchedUsers.cursor) {
    fetchedUsers = await fetchUsers(token, fetchedUsers.cursor)
    allUsers.push(...fetchedUsers.data)
  }
  return allUsers
}

/**
 * Creates google authentication client
 * @returns The google auth client
 */
async function authenticateGoogle(): Promise<any> {
  const { client_email, private_key } = JSON.parse(process.env.GOOGLE_API_JSON)
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  const authClient = await auth.getClient()
  return authClient
}

/**
 * Append data to Google Sheets using API Key
 * @param auth - The google auth client
 * @param rows - The rows to append to the Google Sheet
 * @returns The response from the Google Sheets API
 */
async function updateGoogleSheet(auth: any, rows: any[]) {
  // Clear sheet first
  await clearSheet(auth)

  const sheets = google.sheets({
    version: "v4",
    auth
  })

  const request = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A1", // Adjust to your sheet and cell range
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
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
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1" // Adjust to your sheet and cell range
  }
  try {
    await sheets.spreadsheets.values.clear(request)
    console.log(`Cleared google sheet.`)
  } catch (err) {
    console.error("Failed to clear the Google Sheet", err)
  }
}

if (args.length === 0) {
  console.log("Token required to update google sheet members.")
} else {
  const token = args[0]

  getAllUsers(token)
    .then(async (allUsers: CombinedUserData[]) => {
      const rows = allUsers.map((user: CombinedUserData) => [
        user.email,
        user.first_name,
        user.last_name,
        user.phone_number,
        firestoreTimestampToDate(user.date_of_birth).toISOString(),
        user.membership,
        user.dateJoined,
        user.university_year,
        user.gender,
        user.does_racing,
        user.does_ski,
        user.does_snowboarding,
        user.emergency_contact,
        // Omit stripe id
        user.dietary_requirements,
        user.uid
      ])
      const categories = [
        "Email",
        "First name",
        "Last name",
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
        "UID"
      ]
      const auth = await authenticateGoogle()
      await updateGoogleSheet(auth, [categories, ...rows])
    })
    .then(() => {
      console.log("Successfully updated google sheet members.")
    })
    .catch((e) => {
      console.error(e)
    })
}

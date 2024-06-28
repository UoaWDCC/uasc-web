import admin from "firebase-admin"
import { createReadStream } from "fs"
import * as csv from "csv-parser"

import dotenv from "dotenv"
dotenv.config()

type ExcelUserColumns = {
  "First Name": string
  "Last Name": string
  "E-mail address": string
  "Mobile Number": string
  "Date of Birth": string
  Gender: string
  "Skier/Snowboarder": "New to both!" | "Both" | "Ski" | "Snowboard"
  "Would you be keen on Racing in 2024?!": "Yes" | "No"
  "What year are you at Uni?": string
  "What faculty?": string
  "Emergency Contact details": string
}

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  )
})

const checkAllUsers = async (csvPath: string) => {
  const users: ExcelUserColumns[] = []
  createReadStream(csvPath)
    .pipe(csv.default())
    .on("data", (data) => users.push(data))
    .on("end", async () => {
      // Get all Firebase Auth users
      const firebaseUsers = await admin.auth().listUsers()
      const firebaseEmails = firebaseUsers.users.map((user) => user.email)
      const badUsers: string[] = []
      // Check if each email from the CSV exists in Firebase Auth
      users.forEach((user) => {
        if (
          !firebaseEmails.includes(user["E-mail address"].trim().toLowerCase())
        ) {
          console.log(
            `User with email ${user["E-mail address"]} does not exist in Firebase Auth.`
          )
          badUsers.push(user["E-mail address"].trim().toLowerCase())
        }
      })
      console.log(`array of users: \n":
         ${JSON.stringify(badUsers)}`)
    })
}

const args = process.argv.slice(2)

if (args.length === 1) {
  checkAllUsers(args[0])
}
console.log("exited script")

import admin from "firebase-admin"
import { Timestamp } from "firebase-admin/firestore"
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

const addAllUsers = async (csvPath: string) => {
  const users: ExcelUserColumns[] = []
  createReadStream(csvPath)
    .pipe(csv.default())
    .on("data", (data) => users.push(data))
    .on("end", async () => {
      for (const user of users) {
        try {
          let existing
          try {
            existing = await admin.auth().getUserByEmail(user["E-mail address"])
          } catch (e) {}
          let uid
          console.log(
            "currently adding user with email",
            user["E-mail address"]
          )
          if (!existing) {
            const newUser = await admin
              .auth()
              .createUser({ email: user["E-mail address"].trim() })
            uid = newUser.uid
          } else {
            uid = existing.uid
          }

          await admin.auth().setCustomUserClaims(uid, { member: true })

          await admin
            .firestore()
            .collection("users")
            .doc(uid)
            .set({
              date_of_birth: Timestamp.fromDate(
                new Date(user["Date of Birth"])
              ),
              first_name: user["First Name"],
              last_name: user["Last Name"],
              phone_number: Number.parseInt(user["Mobile Number"]),
              dietary_requirements: "Has not been entered",
              emergency_contact: user["Emergency Contact details"] || "",
              gender: user.Gender,
              does_ski:
                user["Skier/Snowboarder"] === "Both" ||
                user["Skier/Snowboarder"] === "Ski",
              does_snowboarding:
                user["Skier/Snowboarder"] === "Both" ||
                user["Skier/Snowboarder"] === "Snowboard",
              does_racing:
                user["Would you be keen on Racing in 2024?!"] === "Yes",
              university_year: user["What year are you at Uni?"] || "",
              university: "Not Specified" || ""
            })
        } catch (e) {
          console.error("failed to add", user, e)
          continue
        }
      }

      console.log("All users added to the database")
    })
}

const args = process.argv.slice(2)

if (args.length === 1) {
  addAllUsers(args[0])
} else if (args.length === 2 && args[1] === "reset-password") {
  addAllUsers(args[0])
}

console.log("exited script")

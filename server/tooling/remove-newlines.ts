import dotenv from "dotenv"
import * as fs from "fs"

dotenv.config()

function removeCarriageReturns(filename: string) {
  const fileContent = fs.readFileSync(filename, "utf8")

  const updatedContent = fileContent.replaceAll("\\r", "")

  fs.writeFileSync(filename, updatedContent, "utf8")
}

const filename = process.argv[2]

if (!filename) {
  console.log("Please provide a filename as a command-line argument.")
  process.exit(1)
}

removeCarriageReturns(filename)

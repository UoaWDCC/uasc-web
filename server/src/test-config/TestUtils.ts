import {
  EMULATOR_FIRESTORE_PORT,
  EMULATOR_HOST,
  EMULATOR_PROJECT_ID
} from "data-layer/adapters/EmulatorConfig"

export async function cleanFirestore() {
  const response = await fetch(
    `http://${EMULATOR_HOST}:${EMULATOR_FIRESTORE_PORT}/emulator/v1/projects/${EMULATOR_PROJECT_ID}/databases/(default)/documents`,
    {
      method: "DELETE"
    }
  )
  if (response.status !== 200) {
    throw new Error("Trouble clearing Emulator: " + (await response.text()))
  }
}

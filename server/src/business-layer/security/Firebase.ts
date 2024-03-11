import {
  EMULATOR_FIRESTORE_PORT,
  EMULATOR_HOST
} from "data-layer/adapters/EmulatorConfig"
import * as _admin from "firebase-admin"

const keysEnvVar = process.env.GOOGLE_SERVICE_ACCOUNT_JSON

if (!keysEnvVar && process.env.JEST_WORKER_ID !== undefined) {
  throw new Error("The $CREDS environment variable was not found!")
}

const keys = JSON.parse(keysEnvVar)

if (process.env.DEV || process.env.JEST_WORKER_ID !== undefined) {
  process.env.FIRESTORE_EMULATOR_HOST = `${EMULATOR_HOST}:${EMULATOR_FIRESTORE_PORT}`
}

const firebase = _admin.initializeApp({
  credential: _admin.credential.cert(keys)
})

export const admin = _admin

export const auth = firebase.auth()

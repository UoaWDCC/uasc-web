import {
  EMULATOR_FIRESTORE_PORT,
  EMULATOR_HOST
} from "data-layer/adapters/EmulatorConfig"
import * as _admin from "firebase-admin"

if (process.env.DEV || process.env.JEST_WORKER_ID !== undefined) {
  process.env.FIRESTORE_EMULATOR_HOST = `${EMULATOR_HOST}:${EMULATOR_FIRESTORE_PORT}`
}

const firebase = _admin.initializeApp()

export const admin = _admin

export const auth = firebase.auth()

import { auth } from "business-layer/security/Firebase"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  EMULATOR_AUTH_PORT,
  EMULATOR_HOST,
  EMULATOR_PROJECT_ID
} from "data-layer/adapters/EmulatorConfig"
import UserDataService from "data-layer/services/UserDataService"
import { initializeApp } from "firebase/app"
import {
  connectAuthEmulator,
  getAuth,
  signInWithCustomToken
} from "firebase/auth"

import { userInfoMock } from "test-config/mocks/User.mock"

type claims = typeof AuthServiceClaims.ADMIN | typeof AuthServiceClaims.MEMBER

const clientFirebase = initializeApp({
  projectId: EMULATOR_PROJECT_ID,
  apiKey: process.env.API_KEY
})

const clientAuth = getAuth(clientFirebase)
console.log(`${process.env.API_KEY} ${process.env.API_KEY.length}`)
connectAuthEmulator(clientAuth, `http://${EMULATOR_HOST}:${EMULATOR_AUTH_PORT}`)

const userService = new UserDataService()

export const ADMIN_USER_UID = "admin-user"
export const MEMBER_USER_UID = "member-user"
export const GUEST_USER_UID = "guest-user"

export const createUserData = async (uid: string) => {
  await userService.createUserData(uid, userInfoMock)
}

export const createUserWithClaim = async (uid: string, claim?: claims) => {
  await auth.createUser({ uid })

  const customToken = await auth.createCustomToken(uid)
  await auth.setCustomUserClaims(uid, { [claim]: true })
  const { user } = await signInWithCustomToken(clientAuth, customToken)
  return await user.getIdToken()
}

export const deleteUsersFromAuth = async (uids: string[]) => {
  await auth.deleteUsers(uids)
}

export const createUserDataWithStripeId = async (
  uid: string,
  additionalData?: any
) => {
  userInfoMock.stripe_id = null
  const userData = { ...userInfoMock, ...additionalData }
  await userService.createUserData(uid, userData)
}

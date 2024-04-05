import { auth } from "business-layer/security/Firebase"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  EMULATOR_AUTH_PORT,
  EMULATOR_HOST,
  EMULATOR_PROJECT_ID
} from "data-layer/adapters/EmulatorConfig"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import UserDataService from "data-layer/services/UserDataService"
import { initializeApp } from "firebase/app"
import {
  connectAuthEmulator,
  getAuth,
  signInWithCustomToken
} from "firebase/auth"

import {
  memberUserInfoMock,
  adminUserInfoMock,
  guestUserInfoMock
} from "test-config/mocks/User.mock"

type claims = typeof AuthServiceClaims.ADMIN | typeof AuthServiceClaims.MEMBER
type memberships = UserAdditionalInfo["membership"]

const clientFirebase = initializeApp({
  projectId: EMULATOR_PROJECT_ID,
  apiKey: process.env.API_KEY
})

const clientAuth = getAuth(clientFirebase)
connectAuthEmulator(clientAuth, `http://${EMULATOR_HOST}:${EMULATOR_AUTH_PORT}`)

const userService = new UserDataService()
export type userToCreate = {
  uid: string
  membership: memberships
}

export const ADMIN_USER_UID = "admin-user"
export const MEMBER_USER_UID = "member-user"
export const GUEST_USER_UID = "guest-user"

export const createUserData = async (uid: string, membership: memberships) => {
  switch (membership) {
    case "admin":
      await userService.createUserData(uid, adminUserInfoMock)
      break
    case "member":
      await userService.createUserData(uid, memberUserInfoMock)
      break
    case "guest":
      await userService.createUserData(uid, guestUserInfoMock)
      break
  }
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

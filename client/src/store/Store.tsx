import type { User } from "firebase/auth"
import type { UserClaims } from "@/models/User"
import {
  defaultRegistry,
  createStore,
  type Action,
  createHook
} from "react-sweet-state"

type State = {
  currentUser: User | null // firebase type
  currentUserClaims?: UserClaims
}

const defaultUserState = {
  currentUser: null,
  currentUserClaims: undefined
}

const initialState: State = {
  ...defaultUserState
}

const actions = {
  setCurrentUser:
    (user: User | null, userClaims: UserClaims | undefined): Action<State> =>
    ({ setState }) => {
      setState({
        currentUser: user,
        currentUserClaims: userClaims
      })
    },
  resetCurrentUserState:
    (): Action<State> =>
    ({ setState }) => {
      setState({ ...defaultUserState })
    },
  refreshUserToken:
    (): Action<State> =>
    async ({ setState, getState }) => {
      const { currentUser } = getState()
      if (currentUser) {
        try {
          /** Refresh the ID token for the current user */
          await currentUser.getIdToken(true)
        } catch (error) {
          /** If an error occurs while refreshing the token, reset the user state and log the error */
          setState({ ...defaultUserState })
          console.error("Error refreshing ID token:", error)
        }
      }
    }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  initialState,
  actions
})

export const StoreInstance = defaultRegistry.getStore(Store)

export const useAppData = createHook(Store)

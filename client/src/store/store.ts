import { User } from "firebase/auth"
import { UserAdditionalInfo, UserClaims } from "models/User"
import {
  defaultRegistry,
  createStore,
  Action,
  createContainer,
  createHook
} from "react-sweet-state"

type State = {
  currentUser: User | null // firebase type
  currentUserData?: UserAdditionalInfo
  currentUserClaims?: UserClaims
}

const defaultUserState = {
  currentUser: null,
  currentUserClaims: undefined,
  currentUserData: undefined
}

const initialState: State = {
  ...defaultUserState
}

const actions = {
  setCurrentUser:
    (
      user: User | null,
      userData: UserAdditionalInfo | undefined,
      userClaims: UserClaims | undefined
    ): Action<State> =>
    ({ setState }) => {
      setState({
        currentUser: user,
        currentUserData: userData,
        currentUserClaims: userClaims
      })
    },
  resetCurrentUserState:
    (): Action<State> =>
    ({ setState }) => {
      setState({ ...defaultUserState })
    }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  initialState,
  actions
})

export const StoreInstance = defaultRegistry.getStore(Store)

export const useAppData = createHook(Store)

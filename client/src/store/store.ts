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
    (user: User | null): Action<State> =>
    ({ setState }) => {
      setState({ currentUser: user })
    },
  setCurrentUserData:
    (userData: UserAdditionalInfo | undefined): Action<State> =>
    ({ setState }) => {
      setState({ currentUserData: userData })
    },
  setCurrentUserClaims:
    (userClaims: UserClaims | undefined): Action<State> =>
    ({ setState }) => {
      setState({ currentUserClaims: userClaims })
    },
  resetCurrentUserState:
    (): Action<State> =>
    ({ setState }) => {
      setState({ ...defaultUserState })
    }
}

type Actions = typeof actions

export const AppDataContainer = createContainer()

const Store = createStore<State, Actions>({
  initialState,
  actions,
  containedBy: AppDataContainer
})

export const StoreInstance = defaultRegistry.getStore(Store)

export const useAppData = createHook(Store)

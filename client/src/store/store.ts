import { User } from "firebase/auth"
import { UserAdditionalInfo } from "models/User"
import {
  defaultRegistry,
  createStore,
  Action,
  createContainer,
  createHook
} from "react-sweet-state"

type State = {
  current: number
  currentUser: User | null // firebase type
  currentUserData?: UserAdditionalInfo
}

const initialState: State = {
  current: 1000,
  currentUser: null
}

const actions = {
  loadInfo:
    (): Action<State> =>
    async ({ setState }) => {},
  setCurrentUser:
    (user: User | null): Action<State> =>
    ({ setState }) => {
      setState({ currentUser: user })
    },
  setCurrentUserData:
    (userData: UserAdditionalInfo | undefined): Action<State> =>
    ({ setState }) => {
      setState({ currentUserData: userData })
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

import { User } from "firebase/auth"
import {
  defaultRegistry,
  createStore,
  Action,
  createContainer,
  createHook
} from "react-sweet-state"

type State = { current: number; currentUser: User | null }

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

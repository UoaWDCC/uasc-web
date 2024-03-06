import {
  createStore,
  Action,
  createContainer,
  createHook
} from "react-sweet-state"

type State = { userData: number }

const initialState: State = {
  userData: 1000
}

const actions = {
  loadUsers:
    (): Action<State> =>
    async ({ setState }) => {
      setState({})
    }
}

type Actions = typeof actions

export const AppDataContainer = createContainer()

const Store = createStore<State, Actions>({
  initialState,
  actions,
  containedBy: AppDataContainer
})

export const useAppData = createHook(Store)

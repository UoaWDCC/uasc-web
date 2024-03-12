import {
  createStore,
  Action,
  createContainer,
  createHook
} from "react-sweet-state"

type State = { current: number }

const initialState: State = {
  current: 1000
}

const actions = {
  loadInfo:
    (): Action<State> =>
    async ({ setState }) => {}
}

type Actions = typeof actions

export const AppDataContainer = createContainer()

const Store = createStore<State, Actions>({
  initialState,
  actions,
  containedBy: AppDataContainer
})

export const useAppData = createHook(Store)

import {
  createStore,
  Action,
  createContainer,
  createHook
} from "react-sweet-state"

type State = { userData: { name: string } }

const initialState: State = {
  userData: { name: "test" }
}

const actions = {
  increment:
    (to: string = "foo"): Action<State> =>
    ({ setState }) => {
      setState({
        userData: {
          name: to
        }
      })
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

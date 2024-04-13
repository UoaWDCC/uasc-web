import { UserAdditionalInfo } from "models/User"
import {
  createStore,
  Action,
  createContainer,
  createHook
} from "react-sweet-state"

type State = Partial<UserAdditionalInfo>

const initialState: State = {}

const actions = {
  updateFormData:
    (newData: Partial<UserAdditionalInfo>): Action<State> =>
    ({ setState }) => {
      setState(newData)
    },
  resetForm:
    (): Action<State> =>
    ({ setState }) => {
      setState(initialState)
    }
}

type Actions = typeof actions

export const SignUpFormContainer = createContainer()

const Store = createStore<State, Actions>({
  initialState,
  actions,
  containedBy: SignUpFormContainer
})

export const useSignUpFormData = createHook(Store)

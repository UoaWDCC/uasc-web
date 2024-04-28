import { ReducedUserAdditionalInfo } from "models/User"
import { createStore, Action, createHook } from "react-sweet-state"

type State = ReducedUserAdditionalInfo & { email: string }

const initialState: State = {
  email: "",
  date_of_birth: {
    seconds: 0,
    nanoseconds: 0
  },
  does_freestyle: false,
  does_racing: false,
  does_ski: false,
  gender: "",
  emergency_name: "",
  emergency_phone: "",
  emergency_relation: "",
  first_name: "",
  last_name: "",
  dietary_requirements: "",
  faculty: undefined,
  university: undefined,
  student_id: undefined,
  returning: false,
  university_year: ""
}

const actions = {
  updateFormData:
    (newData: Partial<ReducedUserAdditionalInfo>): Action<State> =>
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

const Store = createStore<State, Actions>({
  initialState,
  actions
})

export const useSignUpFormData = createHook(Store)

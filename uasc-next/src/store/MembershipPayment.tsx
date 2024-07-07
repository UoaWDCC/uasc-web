import { MembershipTypes } from "@/models/Payment"
import {
  defaultRegistry,
  createStore,
  Action,
  createHook
} from "react-sweet-state"

type State = {
  membershipType?: MembershipTypes
}

const initialState = {
  membershipType: undefined
}

const actions = {
  setMembershipType:
    (membershipType: MembershipTypes): Action<State> =>
    ({ setState }) => {
      setState({
        membershipType
      })
    },
  resetMembershipType:
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

export const MembershipPaymentStore = defaultRegistry.getStore(Store)

export const useMembershipPaymentDetails = createHook(Store)

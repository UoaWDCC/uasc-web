import { PAGES } from "@/components/composite/SignUpForm/utils/RouteNames"
import { Timestamp } from "firebase/firestore"
import { ReducedUserAdditionalInfo } from "@/models/User"
import { createStore, Action, createHook } from "react-sweet-state"

type FormValidity = { errorMessage?: string; success: boolean }
type State = ReducedUserAdditionalInfo & {
  email: string
  confirmEmail: string
} & {
  formValidity: FormValidity
}

const initialState: State = {
  email: "",
  confirmEmail: "",
  phone_number: 0x0,
  date_of_birth: Timestamp.fromDate(new Date("2000/01/01")),
  does_snowboarding: false,
  does_racing: false,
  does_ski: false,
  gender: "",
  emergency_contact: "",
  first_name: "",
  last_name: "",
  dietary_requirements: "",
  faculty: undefined,
  university: undefined,
  student_id: undefined,
  university_year: "",
  formValidity: {
    success: false
  }
}

const actions = {
  updateFormData:
    (newData: Partial<Omit<State, "formValidity">>): Action<State> =>
    ({ setState }) => {
      setState(newData)
    },
  resetForm:
    (): Action<State> =>
    ({ setState }) => {
      setState(initialState)
    },
  validateForm:
    (pageToValidate: PAGES, nextFn: () => void): Action<State> =>
    ({ getState, setState }) => {
      const validateFirstSection = (invalidFields: string[]) => {
        const { first_name, last_name } = getState()
        if (first_name.length === 0) invalidFields.push("First Name")
        if (last_name.length === 0) invalidFields.push("Last Name")
      }

      const validateContactSection = (invalidFields: string[]) => {
        const { email, confirmEmail, phone_number } = getState()
        const validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (!email.match(validRegex)) {
          invalidFields.push("Email")
        }
        if (confirmEmail !== email) {
          invalidFields.push("Confirm Email")
        }
        if (phone_number.toString().length < 6) {
          invalidFields.push("Phone Number")
        }
      }

      switch (pageToValidate) {
        case PAGES.PersonalFirst: {
          const invalidFields: string[] = []
          validateFirstSection(invalidFields)
          if (invalidFields.length > 0) {
            setState({
              formValidity: {
                errorMessage: `Please fill in ${invalidFields.join(" ")}`,
                success: false
              }
            })
            break
          }

          setState({
            formValidity: {
              errorMessage: undefined,
              success: true
            }
          })
          nextFn()
          break
        }
        case PAGES.PersonalSecond:
          // No required fields here
          setState({
            formValidity: {
              errorMessage: undefined,
              success: true
            }
          })
          nextFn()
          break
        case PAGES.Contact: {
          const invalidFields: string[] = []
          validateContactSection(invalidFields)
          if (invalidFields.length > 0) {
            setState({
              formValidity: {
                errorMessage: `Please enter a valid ${invalidFields.join(", ")}`,
                success: false
              }
            })

            break
          }
          setState({
            formValidity: {
              errorMessage: undefined,
              success: true
            }
          })
          nextFn()
          break
        }
        case PAGES.Additional: {
          const invalidFields: string[] = []
          validateFirstSection(invalidFields)
          validateContactSection(invalidFields)
          if (invalidFields.length > 0) {
            setState({
              formValidity: {
                errorMessage: `Please enter a valid: ${invalidFields.join(", ")}`,
                success: false
              }
            })
            break
          }
          setState({
            formValidity: {
              errorMessage: undefined,
              success: true
            }
          })
          nextFn()
          break
        }
        default:
          setState({
            formValidity: {
              errorMessage: undefined,
              success: true
            }
          })
      }
    }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  initialState,
  actions
})

export const useSignUpFormData = createHook(Store)

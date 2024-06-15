import { useMutation } from "@tanstack/react-query"
import UserService, { SignUpUserBody } from "./UserService"
import { ReducedUserAdditionalInfo } from "models/User"

const SIGN_UP_USER_MUTATION_KEY = "signUpUser" as const

export function useSignUpUserMutation(userData: SignUpUserBody) {
  return useMutation({
    mutationKey: [SIGN_UP_USER_MUTATION_KEY],
    mutationFn: () => UserService.signUpUser(userData)
  })
}

export function useEditSelfMutation(
  userData: Partial<ReducedUserAdditionalInfo>
) {
  return useMutation({
    mutationKey: ["editSelf"],
    mutationFn: () => UserService.editSelf(userData)
  })
}

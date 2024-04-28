import { UseMutationOptions, useMutation } from "@tanstack/react-query"
import UserService, { EditUsersBody, SignUpUserBody } from "./UserService"

const SIGN_UP_USER_MUTATION_KEY = "signUpUser" as const

export function useEditUserMutation(
  users: EditUsersBody,
  options: UseMutationOptions
) {
  return useMutation({
    ...options,
    mutationFn: () => UserService.editUsers(users)
  })
}

export function useSignUpUserMutation(userData: SignUpUserBody) {
  return useMutation({
    mutationKey: [SIGN_UP_USER_MUTATION_KEY],
    mutationFn: () => UserService.signUpUser(userData)
  })
}

export function useSignUpUserMutationMin() {
  return useMutation({
    mutationKey: [SIGN_UP_USER_MUTATION_KEY]
  })
}

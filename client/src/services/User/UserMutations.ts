import { useMutation } from "@tanstack/react-query"
import UserService, { SignUpUserBody } from "./UserService"

const SIGN_UP_USER_MUTATION_KEY = "signUpUser" as const

export function useSignUpUserMutation(userData: SignUpUserBody) {
  return useMutation({
    mutationKey: [SIGN_UP_USER_MUTATION_KEY],
    mutationFn: () => UserService.signUpUser(userData)
  })
}

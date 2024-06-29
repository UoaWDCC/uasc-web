import { useMutation } from "@tanstack/react-query"
import UserService from "./UserService"
import { sendPasswordResetEmail, signInWithCustomToken } from "firebase/auth"
import { auth } from "firebase"
import queryClient from "services/QueryClient"
import { SELF_DATA_QUERY_KEY } from "./UserQueries"

const SIGN_UP_USER_MUTATION_KEY = "signUpUser" as const

/**
 * Specifies who is calling the sign up end point
 */
type SignUpType = "admin" | "member"

export function useSignUpUserMutation(signUpType: SignUpType = "member") {
  return useMutation({
    mutationKey: [SIGN_UP_USER_MUTATION_KEY, signUpType],
    mutationFn: UserService.signUpUser,
    onSuccess: async (data, variables) => {
      if (signUpType === "admin") return
      if (data?.jwtToken) {
        try {
          sendPasswordResetEmail(auth, variables.email) // It must be non-blocking
        } finally {
          await signInWithCustomToken(auth, data.jwtToken)
        }
      }
    },
    retry: 0
  })
}

export function useEditSelfMutation() {
  return useMutation({
    mutationKey: ["editSelf"],
    mutationFn: UserService.editSelf,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SELF_DATA_QUERY_KEY]
      })
  })
}

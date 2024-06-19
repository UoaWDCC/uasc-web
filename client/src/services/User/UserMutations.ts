import { useMutation } from "@tanstack/react-query"
import UserService from "./UserService"
import { sendPasswordResetEmail, signInWithCustomToken } from "firebase/auth"
import { auth } from "firebase"
import { ReducedUserAdditionalInfo } from "models/User"

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
          await sendPasswordResetEmail(auth, variables.email)
        } finally {
          await signInWithCustomToken(auth, data.jwtToken)
        }
      }
    },
    retry: 0
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

import { useMutation } from "@tanstack/react-query"
import UserService, { SignUpUserBody } from "./UserService"
import { sendPasswordResetEmail, signInWithCustomToken } from "firebase/auth"
import { auth } from "firebase"

const SIGN_UP_USER_MUTATION_KEY = "signUpUser" as const

export function useSignUpUserMutation(userData: SignUpUserBody) {
  return useMutation({
    mutationKey: [SIGN_UP_USER_MUTATION_KEY],
    mutationFn: () => UserService.signUpUser(userData),
    onSuccess: async (data) => {
      if (data?.jwtToken) {
        try {
          await sendPasswordResetEmail(auth, userData.email)
        } finally {
          await signInWithCustomToken(auth, data.jwtToken)
        }
      }
    },
    retry: 0
  })
}

import {
  LoginHandlerArgs,
  HandlerResponse
} from "@/components/composite/LoginForm/LoginForm"
import { fireAnalytics } from "@/firebase"
import {
  getAuth,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  sendPasswordResetEmail
} from "firebase/auth"

export const resetPassword = async (
  email: string
): Promise<HandlerResponse> => {
  const auth = getAuth()
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      success: true,
      successMessage: `Password reset link has been sent to ${email}`
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Failed to reset password"
      }
    }
  }
}

export const loginHandler = async ({
  email,
  password
}: LoginHandlerArgs): Promise<HandlerResponse> => {
  const auth = getAuth()
  try {
    await signInWithEmailAndPassword(auth, email, password)
    fireAnalytics("login")
    return { success: true }
  } catch (error) {
    let message
    console.error(error)
    switch (
      (error as { code: (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes] })
        .code
    ) {
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        message = "Incorrect password or email"
        break
      case AuthErrorCodes.USER_DELETED:
        message = "User does not exist"
        break
      default:
        message = "Unknown Error, Please contact us"
        break
    }
    return {
      success: false,
      error: {
        message
      }
    }
  }
}

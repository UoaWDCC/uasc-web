import {
  LoginHandlerArgs,
  HandlerResponse
} from "components/composite/LoginForm/LoginForm"
import {
  getAuth,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  sendPasswordResetEmail
} from "firebase/auth"

const auth = getAuth()

export const resetPasswordHandler = async (
  email: string
): Promise<HandlerResponse> => {
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      success: true,
      successMessage: `Password reset link has been sent to your ${email}`
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
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { success: true }
  } catch (error) {
    let message
    switch (error.code) {
      case AuthErrorCodes.INVALID_EMAIL:
        message = "Invalid Email"
        break
      case AuthErrorCodes.INVALID_PASSWORD:
        message = "Incorrect Password"
        break
      case AuthErrorCodes.USER_DELETED:
        message = "User does not exist"
        break
      default:
        message = "Unknown Error"
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

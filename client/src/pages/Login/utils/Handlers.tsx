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
    return { success: true }
  } catch (error) {
    let message
    console.error(error)
    switch (error.code) {
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

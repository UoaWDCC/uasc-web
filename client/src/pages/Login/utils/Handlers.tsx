import {
  LoginHandlerArgs,
  HandlerResponse
} from "components/composite/LoginForm/LoginForm"
import {
  getAuth,
  signInWithEmailAndPassword,
  AuthErrorCodes
} from "firebase/auth"

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

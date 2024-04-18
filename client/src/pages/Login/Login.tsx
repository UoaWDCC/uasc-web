import LoginForm, {
  LoginHandlerArgs,
  HandlerResponse
} from "components/composite/LoginForm/LoginForm"
import { Typography, Stack, Container, Link } from "@mui/material"
import {
  getAuth,
  signInWithEmailAndPassword,
  AuthErrorCodes
} from "firebase/auth"

const Login = () => {
  const loginHandler = async ({
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
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 25% 60%, #81c7ebaa, #ffffff)"
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} sx={{ paddingTop: "124px" }}>
          <Typography
            variant="h1"
            align="left"
            color="#474747"
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Typography>
          <LoginForm loginHandler={loginHandler} />
          <Link
            align="left"
            href="/register"
            variant="h4"
            underline="none"
            color="#457CC3"
            sx={{ fontWeight: "900" }}
          >
            Don't have an account? Create one now!
          </Link>
        </Stack>
      </Container>
    </div>
  )
}

export default Login

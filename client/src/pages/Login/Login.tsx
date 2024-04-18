import LoginForm from "components/composite/LoginForm/LoginForm"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { Navigate, useNavigate } from "react-router-dom"
import { useAppData } from "store/store"
import { loginHandler } from "./utils/Handlers"

const Login = () => {
  const [{ currentUser }] = useAppData()

  const navigate = useNavigate()

  const passwordResetHandler = () => {
    navigate("reset")
  }

  if (currentUser) {
    navigate("/profile")
  }

  return (
    <FullPageBackgroundImage>
      <LoginForm
        loginHandler={loginHandler}
        passwordResetHandler={passwordResetHandler}
      />
    </FullPageBackgroundImage>
  )
}

export default Login

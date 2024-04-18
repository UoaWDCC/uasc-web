import LoginForm from "components/composite/LoginForm/LoginForm"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { useAppData } from "store/store"
import { loginHandler, resetPassword } from "./utils/Handlers"
import PasswordResetForm from "components/composite/LoginForm/PasswordResetForm/PasswordResetForm"

const Login = () => {
  const [{ currentUser }] = useAppData()

  const navigate = useNavigate()

  const passwordResetHandler = () => {
    navigate("/login/reset")
  }

  const backToLoginHandler = () => {
    navigate("/login")
  }

  if (currentUser) {
    navigate("/profile")
  }

  return (
    <FullPageBackgroundImage>
      <Routes>
        <Route
          index
          element={
            <LoginForm
              loginHandler={loginHandler}
              passwordResetHandler={passwordResetHandler}
            />
          }
        />
        <Route
          path="reset"
          element={
            <PasswordResetForm
              passwordResetHandler={resetPassword}
              backHandler={backToLoginHandler}
            />
          }
        />
      </Routes>
      <Outlet />
    </FullPageBackgroundImage>
  )
}

export default Login

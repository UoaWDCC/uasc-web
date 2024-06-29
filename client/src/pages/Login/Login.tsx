import LoginForm from "components/composite/LoginForm/LoginForm"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { useAppData } from "store/Store"
import { loginHandler, resetPassword } from "./utils/Handlers"
import PasswordResetForm from "components/composite/LoginForm/PasswordResetForm/PasswordResetForm"
import { Footer } from "components/generic/Footer/Footer"
import { useEffect } from "react"
import { fireAnalytics } from "firebase"

const Login = () => {
  const [{ currentUser }] = useAppData()

  const navigate = useNavigate()

  const passwordResetHandler = () => {
    navigate("reset")
    fireAnalytics("page_view")
  }

  const backToLoginHandler = () => {
    navigate("")
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/profile")
    }
  }, [currentUser])

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
      <span className="absolute bottom-0 w-full">
        <Footer />
      </span>
    </FullPageBackgroundImage>
  )
}

export default Login

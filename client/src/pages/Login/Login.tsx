import LoginForm from "components/composite/LoginForm/LoginForm"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
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
        <Route path="reset" element={<>lmao</>} />
      </Routes>
      <Outlet />
    </FullPageBackgroundImage>
  )
}

export default Login

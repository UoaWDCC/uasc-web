"use client"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/composite/LoginForm/LoginForm"
import { fireAnalytics } from "@/firebase"
import { loginHandler } from "./utils/Handlers"

const LoginInner = () => {
  const router = useRouter()

  const passwordResetHandler = () => {
    router.push("/login/reset")
    fireAnalytics("page_view", { page_title: "Password Reset" })
  }

  return (
    <LoginForm
      loginHandler={loginHandler}
      passwordResetHandler={passwordResetHandler}
    />
  )
}

export default LoginInner

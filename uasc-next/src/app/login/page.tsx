"use client"

import LoginForm from "@/components/composite/LoginForm/LoginForm"
import { loginHandler } from "./utils/Handlers"
import { fireAnalytics } from "@/firebase"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const passwordResetHandler = () => {
    router.push("/login/reset")
    fireAnalytics("page_view", { page_title: "Password Reset" })
  }

  return (
    <>
      <LoginForm
        loginHandler={loginHandler}
        passwordResetHandler={passwordResetHandler}
      />
    </>
  )
}

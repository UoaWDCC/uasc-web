"use client"

import PasswordResetForm from "@/components/composite/LoginForm/PasswordResetForm/PasswordResetForm"
import { useRouter } from "next/navigation"
import { resetPassword } from "../utils/Handlers"

export default function ResetPassword() {
  const router = useRouter()

  const backToLoginHandler = () => {
    router.push("/login")
  }
  return (
    <PasswordResetForm
      backHandler={backToLoginHandler}
      passwordResetHandler={resetPassword}
    />
  )
}

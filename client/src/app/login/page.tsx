import type { Metadata } from "next"
import LoginInner from "./LoginInner"

export const metadata: Metadata = {
  title: "Login to UASC",
  description: "Log in to access member only benefits!"
}

export default function Login() {
  return <LoginInner />
}

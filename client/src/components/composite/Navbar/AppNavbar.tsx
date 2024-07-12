"use client"

import { useAppData } from "@/store/Store"
import Navbar from "./Navbar"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"

export const AppNavbar = () => {
  const [{ currentUser, currentUserClaims }] = useAppData()
  const router = useRouter()
  const signOut = () => {
    auth.signOut()
    router.push("/login")
  }
  const signIn = () => {
    router.push("/login")
  }
  return (
    <Navbar
      signInHandler={signIn}
      signOutHandler={signOut}
      isLoggedIn={currentUser !== null}
      isAdmin={currentUserClaims?.admin}
    />
  )
}

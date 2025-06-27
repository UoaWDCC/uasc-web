"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Footer } from "@/components/generic/Footer/Footer"
import FullPageBackgroundImage from "@/components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { useAppData } from "@/store/Store"

export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [{ currentUser }] = useAppData()

  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      router.push("/profile")
    }
  }, [currentUser, router])

  return (
    <>
      <FullPageBackgroundImage>{children}</FullPageBackgroundImage>
      <Footer />
    </>
  )
}

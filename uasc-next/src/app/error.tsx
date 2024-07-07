"use client"

import RefreshNotification from "@/components/composite/RefreshNotification/RefreshNotification"
import { fireAnalytics } from "@/firebase"
import { useEffect } from "react"

export default function UncaughtErrorPage() {
  useEffect(() => {
    fireAnalytics("exception", { event_label: "uncaught exception" })
  }, [])

  return <RefreshNotification />
}

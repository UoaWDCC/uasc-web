"use client"

import WorkInProgressComponent from "@/components/generic/WorkInProgressComponent/WorkInProgressComponent"
import { AdminHeading } from "../AdminHeading"

export default function AdminEventsPage() {
  return (
    <>
      <AdminHeading title="Events" />
      <div className="fixed flex h-screen w-full flex-col items-center justify-center gap-4">
        <WorkInProgressComponent pageName="Admin Events" />
        <p className="text-light-blue-100">Work in progress</p>
      </div>
    </>
  )
}

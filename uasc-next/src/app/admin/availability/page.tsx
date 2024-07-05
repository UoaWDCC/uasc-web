"use client"

import WrappedAdminAvailabilityView from "@/components/composite/Admin/AdminAvailabilityView/WrappedAdminAvailabilityView"
import { AdminHeading } from "../layout"

export default function AdminBookingsPage() {
  return (
    <>
      <AdminHeading title="Availability" />
      <WrappedAdminAvailabilityView />
    </>
  )
}

"use client"

import WrappedAdminBookingHistoryView from "@/components/composite/Admin/AdminBookingHistoryView/WrappedAdminBookingHistoryView"
import { AdminHeading } from "../AdminHeading"

export default function AdminBookingHistoryPage() {
  return (
    <>
      <AdminHeading title="History" />
      <WrappedAdminBookingHistoryView />
    </>
  )
}

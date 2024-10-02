"use client"

import WrappedAdminMemberView from "@/components/composite/Admin/AdminMemberView/ProtectedAdminMemberView"
import { AdminHeading } from "../AdminHeading"

export default function AdminEventsPage() {
  return (
    <>
      <AdminHeading title="Events" />
      <WrappedAdminMemberView />
    </>
  )
}

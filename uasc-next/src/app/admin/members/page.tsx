"use client"

import WrappedAdminMemberView from "@/components/composite/Admin/AdminMemberView/ProtectedAdminMemberView"
import { AdminHeading } from "../layout"

export default function AdminMembersPage() {
  return (
    <>
      <AdminHeading title="Members" />
      <WrappedAdminMemberView />
    </>
  )
}

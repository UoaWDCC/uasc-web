"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { DateSelectionProvider } from "@/components/composite/Admin/AdminAvailabilityView/DateSelectionContext"
import { AdminBookingViewProvider } from "@/components/composite/Admin/AdminBookingView/AdminBookingViewContext"
import AdminNavbar from "@/components/composite/Admin/AdminNavbar/AdminNavbar"
import Loader from "@/components/generic/SuspenseComponent/Loader"
import queryClient from "@/services/QueryClient"
import { useAppData } from "@/store/Store"

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [{ currentUserClaims }] = useAppData()

  if (!currentUserClaims?.admin) {
    return <Loader />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AdminBookingViewProvider>
        <DateSelectionProvider>
          <AdminNavbar />
          <div
            className="bg-mountain-background-image relative z-10 flex min-h-[100vh] w-fit
      min-w-full flex-col items-center bg-cover bg-top bg-no-repeat md:px-8"
          >
            <div className="bg-gray-1 pointer-events-none absolute -z-30 h-full w-full opacity-70" />
            <div className="z-20 flex w-full flex-col items-center pb-8 pt-16">
              {children}
            </div>
          </div>
        </DateSelectionProvider>
      </AdminBookingViewProvider>
    </QueryClientProvider>
  )
}

export default AdminLayout

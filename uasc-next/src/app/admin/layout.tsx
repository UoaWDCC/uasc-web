"use client"

import { DateSelectionProvider } from "@/components/composite/Admin/AdminAvailabilityView/DateSelectionContext"
import AdminNavbar from "@/components/composite/Admin/AdminNavbar/AdminNavbar"
import { useAppData } from "@/store/Store"
import { AdminBookingViewProvider } from "@/components/composite/Admin/AdminBookingView/AdminBookingViewContext"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/services/QueryClient"
import Loader from "@/components/generic/SuspenseComponent/Loader"

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [{ currentUserClaims }] = useAppData()
  const router = useRouter()

  if (!currentUserClaims?.admin) {
    router.push("/")
    return <Loader />
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AdminBookingViewProvider>
          <DateSelectionProvider>
            <AdminNavbar />
            <div
              className="bg-mountain-background-image relative z-10 flex min-h-[100vh] w-full
      flex-col items-center bg-cover bg-top bg-no-repeat"
            >
              <div className="bg-gray-1 pointer-events-none absolute -z-30 h-full w-full opacity-70" />
              <div className="z-20 flex w-full max-w-[1200px] flex-col items-center pb-8 pt-16">
                {children}
              </div>
            </div>
          </DateSelectionProvider>
        </AdminBookingViewProvider>
      </QueryClientProvider>
    </>
  )
}

export default AdminLayout

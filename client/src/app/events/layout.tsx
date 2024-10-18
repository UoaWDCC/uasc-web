"use client"

import { Footer } from "@/components/generic/Footer/Footer"
import queryClient from "@/services/QueryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

type IBookingLayout = Readonly<{ children: ReactNode }>

const EventsPageLayout = ({ children }: IBookingLayout) => {
  return (
    <div
      className="bg-mountain-background-image  relative z-10 flex min-h-screen
      w-full flex-col items-center gap-8 bg-cover bg-top bg-no-repeat"
    >
      <div className="bg-gray-1 pointer-events-none absolute -z-30 h-full w-full opacity-70" />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

      <span className="mt-auto w-full">
        <Footer />
      </span>
    </div>
  )
}

export default EventsPageLayout

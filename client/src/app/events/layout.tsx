"use client"

import queryClient from "@/services/QueryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

type IBookingLayout = Readonly<{ children: ReactNode }>

const EventsPageLayout = ({ children }: IBookingLayout) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default EventsPageLayout

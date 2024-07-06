"use client"

import { ReactNode, useCallback, useContext } from "react"
import {
  BookingContext,
  BookingContextProvider
} from "@/components/composite/Booking/BookingContext"
import { useUserLoggedInCallback } from "@/hooks/useUserLoggedInCallback"
import { PolicyTabs } from "@/components/composite/BookingsPolicyTabs/TabsContent"
import { Footer } from "@/components/generic/Footer/Footer"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/services/QueryClient"

type IBookingLayout = Readonly<{ children: ReactNode }>

const InnerBookingLayout = ({ children }: IBookingLayout) => {
  const { getExistingSession } = useContext(BookingContext)

  const getExistingSessionCallback = useCallback(() => {
    getExistingSession?.()
  }, [getExistingSession])

  useUserLoggedInCallback(getExistingSessionCallback)

  return (
    <>
      <div
        className="bg-book-lodge-image relative z-10 flex min-h-[90vh] w-full
      flex-col items-center bg-cover bg-top bg-no-repeat py-8"
      >
        <div className="flex w-full max-w-[850px] flex-col items-center gap-8">
          <h2 className="text-dark-blue-100 self-start italic">
            Book the lodge
          </h2>
          <span className="w-full">{children}</span>
        </div>
      </div>
      <span className="relative z-[11]">
        <PolicyTabs />
      </span>
      <Footer />
    </>
  )
}

export default function BookingLayout({ children }: IBookingLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingContextProvider>
        <InnerBookingLayout>{children}</InnerBookingLayout>
      </BookingContextProvider>
    </QueryClientProvider>
  )
}

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
import { PortableText } from "next-sanity"

type IBookingLayout = Readonly<{
  children: ReactNode
  policyInfoProps: Omit<React.ReactNode, "handbookBookLodgeClick"> & {
    children?: React.ReactNode
  }
}>

const InnerBookingLayout = ({ children }: IBookingLayout) => {
  const { getExistingSession, policies } = useContext(BookingContext)

  const getExistingSessionCallback = useCallback(() => {
    getExistingSession?.()
  }, [getExistingSession])

  useUserLoggedInCallback(getExistingSessionCallback)

  const PoliciesContent = policies
    ? policies
        .slice(0, 3)
        .map((policy, index) =>
          policy.information ? (
            <PortableText key={index} value={policy.information} />
          ) : (
            <></>
          )
        )
    : []

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
        <PolicyTabs policiesArray={PoliciesContent} />
      </span>
      <Footer />
    </>
  )
}

export default function BookingLayout({
  children,
  policyInfoProps
}: IBookingLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingContextProvider>
        <InnerBookingLayout policyInfoProps={policyInfoProps}>
          {children}
        </InnerBookingLayout>
      </BookingContextProvider>
    </QueryClientProvider>
  )
}

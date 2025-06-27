"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import FullPageBackgroundImage from "@/components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import queryClient from "@/services/QueryClient"

export default function RegisterLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <FullPageBackgroundImage>
        <span className="absolute bottom-0 left-1/2 h-fit w-full -translate-x-1/2 sm:fixed">
          {children}
        </span>
      </FullPageBackgroundImage>
    </QueryClientProvider>
  )
}

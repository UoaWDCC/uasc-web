import type { Meta } from "@storybook/react"

import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider/next-13.5"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/services/QueryClient"
import Step from "./[step]/page"

const meta: Meta<typeof Step> = {
  component: Step
}

export default meta

export const DefaultRegisterPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouterProvider>
        <Step params={{ step: "personal_1" }} />
      </MemoryRouterProvider>
    </QueryClientProvider>
  )
}

import type { Meta, StoryObj } from "@storybook/react"
import { PaymentSection } from "./PaymentSection"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider/next-13.5"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/services/QueryClient"
const meta: Meta<typeof PaymentSection> = {
  component: PaymentSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MemoryRouterProvider>
    )
  ]
}

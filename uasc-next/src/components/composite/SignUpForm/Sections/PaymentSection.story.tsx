import type { Meta, StoryObj } from "@storybook/react"
import { PaymentSection } from "./PaymentSection"
import { MemoryRouter } from "react-router-dom"
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
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MemoryRouter>
    )
  ]
}

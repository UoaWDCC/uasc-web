import type { Meta, StoryObj } from "@storybook/react"
import { PaymentInformationSection } from "./PaymentSection"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/services/QueryClient"
const meta: Meta<typeof PaymentInformationSection> = {
  component: PaymentInformationSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ]
}

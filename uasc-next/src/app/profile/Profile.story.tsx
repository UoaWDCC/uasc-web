import type { Meta, StoryObj } from "@storybook/react"

import Profile from "./page"
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider/next-13.5"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/services/QueryClient"

const meta: Meta<typeof Profile> = {
  component: Profile
}

export default meta
type Story = StoryObj<typeof Profile>

export const DefaultProfilePage: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouterProvider>
          <Story />
        </MemoryRouterProvider>
      </QueryClientProvider>
    )
  ]
}

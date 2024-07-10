import type { Meta, StoryObj } from "@storybook/react"

import Profile from "./Profile"
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider/next-13.5"

const meta: Meta<typeof Profile> = {
  component: Profile
}

export default meta
type Story = StoryObj<typeof Profile>

export const DefaultProfilePage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    )
  ]
}

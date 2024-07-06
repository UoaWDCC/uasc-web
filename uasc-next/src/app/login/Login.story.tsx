import type { Meta, StoryObj } from "@storybook/react"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider/next-13.5"

import Login from "./page"

const meta: Meta<typeof Login> = {
  component: Login
}

export default meta
type Story = StoryObj<typeof Login>

export const DefaultLoginPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    )
  ]
}

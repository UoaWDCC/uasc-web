import type { Meta, StoryObj } from "@storybook/react"

import { Footer } from "./Footer"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider/next-13.5"

const meta: Meta<typeof Footer> = {
  component: Footer
}

export default meta
type Story = StoryObj<typeof meta>
export const DefaultFooter: Story = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    )
  ]
}

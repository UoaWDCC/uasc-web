import type { Meta, StoryObj } from "@storybook/react"
import { SignUpNotif } from "./SignUpNotif"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider/next-13.5"
const meta: Meta<typeof SignUpNotif> = {
  component: SignUpNotif
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultNotif: Story = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    )
  ]
}

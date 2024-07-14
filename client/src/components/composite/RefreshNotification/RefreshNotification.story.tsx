import type { Meta, StoryObj } from "@storybook/react"
import RefreshNotification from "./RefreshNotification"
const meta: Meta<typeof RefreshNotification> = {
  component: RefreshNotification
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultRefreshNotification: Story = {
  args: {}
}

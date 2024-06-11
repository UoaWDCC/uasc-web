import type { Meta, StoryObj } from "@storybook/react"
import InvalidPage from "./404"
const meta: Meta<typeof InvalidPage> = {
  component: InvalidPage
}

export default meta
type Story = StoryObj<typeof meta>

export const Page404: Story = {
  args: {}
}

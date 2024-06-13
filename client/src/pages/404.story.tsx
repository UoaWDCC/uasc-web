import type { Meta, StoryObj } from "@storybook/react"
import NoMatch from "./404"
const meta: Meta<typeof NoMatch> = {
  component: NoMatch
}

export default meta
type Story = StoryObj<typeof meta>

export const Page404: Story = {
  args: {}
}

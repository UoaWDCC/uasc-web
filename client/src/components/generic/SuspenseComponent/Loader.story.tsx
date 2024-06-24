import type { Meta, StoryObj } from "@storybook/react"

import Loader from "./Loader"
const meta: Meta<typeof Loader> = {
  component: Loader
}

export default meta
type Story = StoryObj<typeof meta>
export const LoaderType1: Story = {
  tags: ["autodocs"],
  args: {}
}

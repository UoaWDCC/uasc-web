import type { Meta, StoryObj } from "@storybook/react"

import ResponsiveBackgroundImage from "./ResponsiveBackground"

const meta: Meta<typeof ResponsiveBackgroundImage> = {
  component: ResponsiveBackgroundImage
}

export default meta
type Story = StoryObj<typeof ResponsiveBackgroundImage>

export const DefaultExample: Story = {
  args: {}
}

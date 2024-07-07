import type { Meta, StoryObj } from "@storybook/react"

import FullPageBackgroundImage from "./FullPageBackgroundImage"

const meta: Meta<typeof FullPageBackgroundImage> = {
  component: FullPageBackgroundImage
}

export default meta
type Story = StoryObj<typeof FullPageBackgroundImage>

export const DefaultExample: Story = {
  args: {}
}

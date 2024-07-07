import type { Meta, StoryObj } from "@storybook/react"

import FullPageBookLodgeImage from "./FullPageBookLodgeImage"

const meta: Meta<typeof FullPageBookLodgeImage> = {
  component: FullPageBookLodgeImage
}

export default meta
type Story = StoryObj<typeof FullPageBookLodgeImage>

export const DefaultExample: Story = {
  args: {}
}

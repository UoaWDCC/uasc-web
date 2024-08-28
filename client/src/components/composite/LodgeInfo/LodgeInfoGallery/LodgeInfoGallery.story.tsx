import type { Meta, StoryObj } from "@storybook/react"
import LodgeInfoGallery from "./LodgeInfoGallery"

const meta: Meta<typeof LodgeInfoGallery> = {
  component: LodgeInfoGallery
}

export default meta

type Story = StoryObj<typeof LodgeInfoGallery>

export const Default: Story = {
  args: {
    imageUrls: [
      "https://via.placeholder.com/400x400?text=Image+1",
      "https://via.placeholder.com/400x400?text=Image+2",
      "https://via.placeholder.com/400x400?text=Image+3",
      "https://via.placeholder.com/400x400?text=Image+4"
    ]
  },
  tags: ["autodocs"]
}

export const SingleImage: Story = {
  args: {
    imageUrls: ["https://via.placeholder.com/400x400?text=Single+Image"]
  },
  tags: ["autodocs"]
}

export const NoImages: Story = {
  args: {
    imageUrls: []
  },
  tags: ["autodocs"]
}

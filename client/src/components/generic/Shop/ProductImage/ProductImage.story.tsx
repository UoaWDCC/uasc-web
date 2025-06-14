import type { Meta, StoryObj } from "@storybook/react"
import ProductImage from "./ProductImage"

const meta: Meta<typeof ProductImage> = {
  component: ProductImage,
  title: "Shop/ProductImage",
  tags: ["autodocs"],
  argTypes: {
    mainImageUrl: {
      control: "text",
      description: "URL for the main product image"
    },
    secondaryImageUrl: {
      control: "text",
      description: "Optional URL for the secondary product image"
    },
    itemName: {
      control: "text",
      description: "Product name for accessibility"
    },
    showSecondaryImage: {
      control: "boolean",
      description: "Whether to show the secondary image"
    },
    setShowSecondaryImage: {
      action: "setShowSecondaryImage",
      description: "Function to toggle image visibility state"
    }
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    )
  ]
}

export default meta

type Story = StoryObj<typeof ProductImage>

export const Default: Story = {
  args: {
    mainImageUrl: "https://source.unsplash.com/random/300x200?product",
    itemName: "Sample Product",
    showSecondaryImage: false,
    setShowSecondaryImage: () => {}
  }
}

export const WithSecondaryImage: Story = {
  args: {
    mainImageUrl: "https://source.unsplash.com/random/300x200?product1",
    secondaryImageUrl: "https://source.unsplash.com/random/300x200?product2",
    itemName: "Product with Multiple Views",
    showSecondaryImage: false,
    setShowSecondaryImage: () => {}
  }
}

export const Interactive: Story = {
  render: () => {
    return (
      <ProductImage
        mainImageUrl="https://source.unsplash.com/random/300x200?product3"
        secondaryImageUrl="https://source.unsplash.com/random/300x200?product4"
        itemName="Interactive Product"
        showSecondaryImage={false}
        setShowSecondaryImage={() => {}}
      />
    )
  }
}

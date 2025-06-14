import type { Meta, StoryObj } from "@storybook/react"
import ProductInfo from "./ProductInfo"

const meta: Meta<typeof ProductInfo> = {
  component: ProductInfo,
  title: "Shop/ProductInfo",
  tags: ["autodocs"],
  argTypes: {
    itemName: {
      control: "text",
      description: "Name of the product"
    },
    displayPrice: {
      control: "text",
      description: "Optional price to display"
    },
    description: {
      control: "text",
      description: "Optional product description"
    },
    googleFormLink: {
      control: "text",
      description: "Link to Google Form for ordering"
    }
  },
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm rounded-lg bg-white p-2">
        <Story />
      </div>
    )
  ]
}

export default meta

type Story = StoryObj<typeof ProductInfo>

export const Default: Story = {
  args: {
    itemName: "Classic T-Shirt",
    displayPrice: "$24.99",
    description: "A comfortable cotton t-shirt perfect for everyday wear.",
    googleFormLink: "https://forms.google.com/sample-form"
  }
}

export const WithoutPrice: Story = {
  args: {
    itemName: "Limited Edition Item",
    description: "Exclusive item with custom pricing based on options.",
    googleFormLink: "https://forms.google.com/custom-pricing-form"
  }
}

export const WithoutDescription: Story = {
  args: {
    itemName: "Simple Product",
    displayPrice: "$19.99",
    googleFormLink: "https://forms.google.com/simple-product-form"
  }
}

export const LongDescription: Story = {
  args: {
    itemName: "Premium Product",
    displayPrice: "$59.99",
    description:
      "This premium product features high-quality materials and craftsmanship. Made with attention to detail, this item is built to last and provides exceptional value. Perfect for those who appreciate quality and durability in their purchases.",
    googleFormLink: "https://forms.google.com/premium-product-form"
  }
}

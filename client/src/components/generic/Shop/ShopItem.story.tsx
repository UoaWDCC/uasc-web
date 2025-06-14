import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import ShopItem from "./ShopItem"
import { ShopItem as ShopItemType } from "../../../models/sanity/ShopItem/Utils"

const meta: Meta<typeof ShopItem> = {
  component: ShopItem,
  title: "Components/Shop/ShopItem",
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample shop items for different variations
const basicItem: ShopItemType = {
  _id: "1",
  itemName: "Basic T-Shirt",
  mainImageUrl:
    "https://via.placeholder.com/400x300/f8f8f8/333333?text=Main+Image",
  googleFormLink: "https://forms.google.com/example",
  displayPrice: "$25.00"
}

const fullItem: ShopItemType = {
  _id: "2",
  itemName: "Premium Sweatshirt",
  mainImageUrl:
    "https://via.placeholder.com/400x300/e9f5ff/333333?text=Main+Image",
  secondaryImageUrl:
    "https://via.placeholder.com/400x300/ffe9e9/333333?text=Secondary+Image",
  googleFormLink: "https://forms.google.com/example",
  displayPrice: "$45.00",
  description:
    "High-quality sweatshirt made from organic cotton. Features a comfortable fit with minimal shrinkage after washing."
}

const longDescriptionItem: ShopItemType = {
  _id: "3",
  itemName: "Limited Edition Hoodie",
  mainImageUrl:
    "https://via.placeholder.com/400x300/f0f0f0/333333?text=Main+Image",
  secondaryImageUrl:
    "https://via.placeholder.com/400x300/f8f8f8/333333?text=Secondary+Image",
  googleFormLink: "https://forms.google.com/example",
  displayPrice: "$65.00",
  description:
    "This limited edition hoodie is crafted from premium materials for ultimate comfort and style. Features include double-lined hood, reinforced seams, and a kangaroo pocket. Each piece is uniquely numbered and comes with a certificate of authenticity."
}

const expensiveItem: ShopItemType = {
  _id: "4",
  itemName: "Designer Jacket",
  mainImageUrl:
    "https://via.placeholder.com/400x300/fff8e8/333333?text=Main+Image",
  googleFormLink: "https://forms.google.com/example",
  displayPrice: "$199.99",
  description: "Premium designer jacket with water-resistant exterior."
}

export const Basic: Story = {
  args: {
    item: basicItem
  }
}

export const WithSecondaryImage: Story = {
  args: {
    item: fullItem
  }
}

export const WithLongDescription: Story = {
  args: {
    item: longDescriptionItem
  }
}

export const HighPriceItem: Story = {
  args: {
    item: expensiveItem
  }
}

export const MultipleItems: Story = {
  decorators: [
    () => (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ShopItem item={basicItem} />
        <ShopItem item={fullItem} />
        <ShopItem item={expensiveItem} />
      </div>
    )
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Displays multiple shop items in a grid layout to demonstrate how they appear in a collection."
      }
    }
  }
}

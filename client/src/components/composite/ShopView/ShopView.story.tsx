import type { Meta, StoryObj } from "@storybook/react"
import ShopView from "./ShopView"
import type { ShopItem as ShopItemType } from "../../../models/sanity/ShopItem/Utils"

const meta: Meta<typeof ShopView> = {
  title: "Composite/ShopView",
  component: ShopView,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof ShopView>

// Sample shop items for stories
const mockItems: ShopItemType[] = [
  {
    _id: "1",
    itemName: "Winter Ski Jacket",
    mainImageUrl: "https://placehold.co/400x300?text=Ski+Jacket",
    secondaryImageUrl: "https://placehold.co/400x300?text=Ski+Jacket+Back",
    googleFormLink: "https://forms.google.com/product1",
    displayPrice: "$149.99",
    description:
      "High-quality waterproof ski jacket perfect for cold weather conditions."
  },
  {
    _id: "2",
    itemName: "Ski Goggles",
    mainImageUrl: "https://placehold.co/400x300?text=Ski+Goggles",
    secondaryImageUrl: "https://placehold.co/400x300?text=Goggles+Side",
    googleFormLink: "https://forms.google.com/product2",
    displayPrice: "$79.99",
    description:
      "Anti-fog ski goggles with UV protection and wide field of view."
  },
  {
    _id: "3",
    itemName: "Thermal Base Layer",
    mainImageUrl: "https://placehold.co/400x300?text=Base+Layer",
    secondaryImageUrl: "https://placehold.co/400x300?text=Base+Layer+Detail",
    googleFormLink: "https://forms.google.com/product3",
    displayPrice: "$49.99",
    description:
      "Moisture-wicking thermal base layer to keep you warm and dry on the slopes."
  },
  {
    _id: "4",
    itemName: "Ski Poles",
    mainImageUrl: "https://placehold.co/400x300?text=Ski+Poles",
    secondaryImageUrl: "https://placehold.co/400x300?text=Ski+Poles+Detail",
    googleFormLink: "https://forms.google.com/product4",
    displayPrice: "$59.99",
    description:
      "Durable aluminum ski poles with ergonomic handles for all-day comfort."
  }
]

export const Default: Story = {
  args: {
    items: mockItems
  }
}

export const Empty: Story = {
  args: {
    items: []
  }
}

export const SingleItem: Story = {
  args: {
    items: [mockItems[0]]
  }
}

export const LoadingState: Story = {
  args: {
    isLoading: true
  }
}

export const ErrorState: Story = {
  args: {
    error: new Error("Failed to fetch shop items")
  }
}

export const EmptyState: Story = {
  args: {
    items: []
  }
}

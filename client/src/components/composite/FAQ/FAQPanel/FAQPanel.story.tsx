import type { Meta, StoryObj } from "@storybook/react"
import FAQPanel from "./FAQPanel"

const meta = {
  title: "Composite/FAQ/FAQPanel",
  component: FAQPanel,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof FAQPanel>

export default meta
type Story = StoryObj<typeof meta>

const mockFAQItems = [
  {
    question: "How do I book the lodge?",
    answer:
      "You can book the lodge through our online booking system. Simply navigate to the 'Book the Lodge!' page and select your preferred dates.",
    category: "Bookings"
  },
  {
    question: "What are the rates for members vs non-members?",
    answer:
      "UASC members receive discounted rates. Current rates can be found on our booking page.",
    category: "Bookings"
  },
  {
    question: "How do I become a member?",
    answer:
      "You can sign up for membership through our registration page. Membership includes access to events, discounted lodge rates, and more!",
    category: "Membership"
  },
  {
    question: "What facilities are available at the lodge?",
    answer:
      "The lodge features comfortable accommodation, a fully equipped kitchen, dining area, and stunning mountain views. Perfect for skiing, hiking, and relaxation."
  }
]

export const Default: Story = {
  args: {
    items: mockFAQItems
  }
}

export const SingleCategory: Story = {
  args: {
    items: mockFAQItems.filter((item) => item.category === "Bookings")
  }
}

export const NoCategories: Story = {
  args: {
    items: mockFAQItems.map((item) => ({ ...item, category: undefined }))
  }
}

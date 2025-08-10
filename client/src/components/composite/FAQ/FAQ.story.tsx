import type { Meta, StoryObj } from "@storybook/react"
import FAQ from "./FAQ"
import type { FAQCategory } from "@/models/sanity/FAQCategory/Utils"

const meta = {
  title: "Composite/FAQ",
  component: FAQ,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof FAQ>

export default meta
type Story = StoryObj<typeof meta>

const mockFAQCategories: FAQCategory[] = [
  {
    name: "Membership",
    description: "Questions about joining and member benefits",
    faqItems: [
      {
        question: "How do I become a member?",
        answer:
          "You can sign up for membership through our registration page. Membership includes access to events, discounted lodge rates, and more!"
      },
      {
        question: "What are the membership benefits?",
        answer:
          "Members enjoy discounted lodge rates, priority booking, exclusive events, and access to club equipment."
      }
    ]
  },
  {
    name: "Lodge Bookings",
    description: "Everything you need to know about booking our mountain lodge",
    faqItems: [
      {
        question: "How do I book the lodge?",
        answer:
          "You can book the lodge through our online booking system. Simply navigate to the 'Book the Lodge!' page and select your preferred dates."
      },
      {
        question: "What are the rates for members vs non-members?",
        answer:
          "UASC members receive discounted rates. Current member rates are $40/night, non-member rates are $80/night."
      }
    ]
  }
]

export const Default: Story = {
  args: {
    categories: mockFAQCategories
  }
}

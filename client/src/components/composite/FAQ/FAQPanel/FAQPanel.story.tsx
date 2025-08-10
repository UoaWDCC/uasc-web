import type { Meta, StoryObj } from "@storybook/react"
import FAQPanel from "./FAQPanel"
import type { FAQCategory } from "@/models/sanity/FAQCategory/Utils"

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

// FAQ Categories data structure
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
      },
      {
        question: "How much does membership cost?",
        answer:
          "Annual membership is $150 for students and $250 for non-students. This includes access to all club facilities and events."
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
      },
      {
        question: "What facilities are available at the lodge?",
        answer:
          "The lodge features comfortable accommodation for 20 people, a fully equipped kitchen, dining area, and stunning mountain views. Perfect for skiing, hiking, and relaxation."
      },
      {
        question: "Can I cancel my booking?",
        answer:
          "Yes, cancellations made more than 48 hours in advance receive a full refund. Cancellations within 48 hours are subject to a 50% cancellation fee."
      }
    ]
  },
  {
    name: "Events",
    description: "Information about club events and activities",
    faqItems: [
      {
        question: "What types of events does UASC organize?",
        answer:
          "We organize skiing trips, hiking expeditions, social events, training sessions, and seasonal celebrations throughout the year."
      },
      {
        question: "How do I sign up for events?",
        answer:
          "Events are posted on our website and social media. You can sign up through our events page or contact us directly."
      }
    ]
  }
]

export const Default: Story = {
  args: {
    categories: mockFAQCategories
  }
}

export const SingleCategory: Story = {
  name: "Single Category",
  args: {
    categories: mockFAQCategories.filter(
      (category) => category.name === "Membership"
    )
  }
}

export const WithoutDescriptions: Story = {
  name: "Categories Without Descriptions",
  args: {
    categories: mockFAQCategories.map((category) => ({
      ...category,
      description: undefined
    }))
  }
}

export const EmptyState: Story = {
  name: "Empty State",
  args: {
    categories: []
  }
}

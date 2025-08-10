import type { Meta, StoryObj } from "@storybook/react"
import FAQItem from "./FAQItem"

const meta = {
  title: "Generic/FAQItem",
  component: FAQItem,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof FAQItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    question: "How do I book the lodge?",
    answer:
      "You can book the lodge through our online booking system. Simply navigate to the 'Book the Lodge!' page and select your preferred dates."
  }
}

export const LongAnswer: Story = {
  args: {
    question: "What are the cancellation policies?",
    answer: `Our cancellation policy varies depending on the type of booking and timing:

- Cancellations made more than 30 days in advance: Full refund
- Cancellations made 15-30 days in advance: 50% refund  
- Cancellations made less than 15 days in advance: No refund

Please note that these policies may be subject to change during peak seasons.`
  }
}

export const WithCategory: Story = {
  args: {
    question: "Are non-members allowed to book?",
    answer:
      "Yes, non-members can book the lodge, though priority is given to UASC members. Non-member rates apply.",
    category: "Membership"
  }
}

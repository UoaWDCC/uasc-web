import type { Meta, StoryObj } from "@storybook/react"
import FAQ from "./FAQ"

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

const mockFAQItems = [
  {
    question: "How do I book the lodge?",
    answer:
      "You can book the lodge through our online booking system. Simply navigate to the 'Book the Lodge!' page and select your preferred dates. You'll need to be a registered user to make a booking.",
    category: "Bookings"
  },
  {
    question: "What are the rates for members vs non-members?",
    answer:
      "UASC members receive significantly discounted rates compared to non-members. Current rates can be found on our booking page when you select your dates.",
    category: "Bookings"
  },
  {
    question: "What's the cancellation policy?",
    answer: `Our cancellation policy varies depending on the timing:

- Cancellations made more than 30 days in advance: Full refund
- Cancellations made 15-30 days in advance: 50% refund  
- Cancellations made less than 15 days in advance: No refund

Please note that policies may vary during peak seasons.`,
    category: "Bookings"
  },
  {
    question: "How do I become a member?",
    answer:
      "You can sign up for membership through our registration page. Membership includes access to exclusive events, discounted lodge rates, priority booking, and more benefits!",
    category: "Membership"
  },
  {
    question: "What are the membership fees?",
    answer:
      "Current membership fees can be found on our registration page. We offer different membership tiers including student rates and family memberships.",
    category: "Membership"
  },
  {
    question: "What facilities are available at the lodge?",
    answer:
      "The lodge features comfortable accommodation for groups, a fully equipped kitchen, dining and lounge areas, heating, and stunning mountain views. It's perfect for skiing, hiking, and mountain relaxation.",
    category: "Lodge"
  },
  {
    question: "Is the lodge suitable for beginners?",
    answer:
      "Absolutely! The lodge is a great base for skiers and snowboarders of all levels. The nearby slopes offer terrain suitable for beginners through to advanced.",
    category: "Lodge"
  }
]

export const Default: Story = {
  args: {
    items: mockFAQItems
  }
}

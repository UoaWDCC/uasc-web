import type { Meta } from "@storybook/react"
import {
  BehaviourPolicyContent,
  BookingPolicyContent,
  PolicyTabs
} from "./TabsContent"

const meta: Meta = {
  component: PolicyTabs
}

export default meta
export const DefaultPolicyTabs = () => {
  return <PolicyTabs />
}

export const BookingPolicyStory = () => {
  return <BookingPolicyContent />
}

export const CancellationPolicyStory = () => {
  return <CancellationPolicyStory />
}

export const BehaviourPolicyStory = () => {
  return <BehaviourPolicyContent />
}

import type { Meta } from "@storybook/react"
import {
  BehaviourPolicyContent,
  BookingPolicyContent,
  CancellationPolicyContent,
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
  return <CancellationPolicyContent />
}

export const BehaviourPolicyStory = () => {
  return <BehaviourPolicyContent />
}

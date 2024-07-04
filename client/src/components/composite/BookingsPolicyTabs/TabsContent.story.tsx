import type { Meta } from "@storybook/react"
import {
  BookingPolicyContent,
  CancellationPolicyContent,
  BehaviourPolicyContent,
  PolicyTabs
} from "./tabscontent"

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

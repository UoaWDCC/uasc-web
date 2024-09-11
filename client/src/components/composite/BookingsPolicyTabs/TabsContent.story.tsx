import type { Meta } from "@storybook/react"
import {
  BehaviourPolicyContent,
  CancellationPolicyContent,
  LodgeBookingsPolicyContent,
  PolicyTabs
} from "./TabsContent"

const meta: Meta = {
  component: PolicyTabs
}

export default meta
export const DefaultPolicyTabs = () => {
  return <PolicyTabs />
}

export const LodgeBookingsPolicyStory = () => {
  return <LodgeBookingsPolicyContent />
}

export const CancellationPolicyStory = () => {
  return <CancellationPolicyContent />
}

export const BehaviourPolicyStory = () => {
  return <BehaviourPolicyContent />
}

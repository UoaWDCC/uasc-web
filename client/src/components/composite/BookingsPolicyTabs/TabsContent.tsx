import { useState } from "react"
import TabsComponent from "@/components/generic/TabsComponent/TabsComponent"
import { PortableText } from "@portabletext/react"
import { POLICIES_GROQ_QUERY, Policies } from "@/models/sanity/Policies/Utils"
import { sanityQuery } from "../../../../sanity/lib/utils"

export const BookingPolicyContent = async () => {
  const policies = await sanityQuery<Policies[]>(POLICIES_GROQ_QUERY)

  /**
   * We assume there will be only one based on the way {@link Policies} is set up in sanity
   *
   */
  const policiesSingleton: Policies | undefined =
    policies.length > 0 ? policies[2] : undefined

  const LodgeBookingsPolicies = () => {
    return (
      policiesSingleton?.information && (
        <PortableText value={policiesSingleton.information} />
      )
    )
  }

  return <LodgeBookingsPolicies />
}

export const CancellationPolicyContent = async () => {
  const policies = await sanityQuery<Policies[]>(POLICIES_GROQ_QUERY)

  /**
   * We assume there will be only one based on the way {@link Policies} is set up in sanity
   *
   */
  const policiesSingleton: Policies | undefined =
    policies.length > 0 ? policies[0] : undefined

  const CancellationPolicies = () => {
    return (
      policiesSingleton?.information && (
        <PortableText value={policiesSingleton.information} />
      )
    )
  }

  return <CancellationPolicies />
}

export const BehaviourPolicyContent = async () => {
  const policies = await sanityQuery<Policies[]>(POLICIES_GROQ_QUERY)

  /**
   * We assume there will be only one based on the way {@link Policies} is set up in sanity
   *
   */
  const policiesSingleton: Policies | undefined =
    policies.length > 0 ? policies[1] : undefined

  const BehaviourPolicies = () => {
    return (
      policiesSingleton?.information && (
        <PortableText value={policiesSingleton.information} />
      )
    )
  }

  return <BehaviourPolicies />
}

enum PolicyPage {
  ONE,
  TWO,
  THREE
}
const exampleHeadings = [
  {
    title: "LODGE BOOKINGS",
    content: <BookingPolicyContent />,
    index: PolicyPage.ONE
  },
  {
    title: "CANCELLATION",
    content: <CancellationPolicyContent />,
    index: PolicyPage.TWO
  },
  {
    title: "BEHAVIOUR",
    content: <BehaviourPolicyContent />,
    index: PolicyPage.THREE
  }
]

export const PolicyTabs = () => {
  const [index, setIndex] = useState<PolicyPage>(PolicyPage.ONE)
  return (
    <TabsComponent
      tabs={exampleHeadings}
      selectedIndex={index}
      setCurrentIndex={setIndex}
    />
  )
}

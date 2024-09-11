import { useState, useEffect } from "react"
import TabsComponent from "@/components/generic/TabsComponent/TabsComponent"
import { PortableText } from "@portabletext/react"
import { POLICIES_GROQ_QUERY, Policies } from "@/models/sanity/Policies/Utils"
import { sanityQuery } from "../../../../sanity/lib/utils"

import PropTypes from "prop-types"

export const BookingPolicyContent = ({
  policiesSingleton
}: {
  policiesSingleton: Policies | undefined
}) => {
  return (
    policiesSingleton?.information && (
      <PortableText value={policiesSingleton.information} />
    )
  )
}

BookingPolicyContent.propTypes = {
  policiesSingleton: PropTypes.shape({
    information: PropTypes.array
  })
}

export const LodgeBookingsPolicyContent = () => {
  const [policiesSingleton, setPoliciesSingleton] = useState<
    Policies | undefined
  >(undefined)

  useEffect(() => {
    const fetchPolicies = async () => {
      const policies = await sanityQuery<Policies[]>(POLICIES_GROQ_QUERY)
      setPoliciesSingleton(policies.length > 0 ? policies[2] : undefined)
    }

    fetchPolicies()
  }, [])

  return <BookingPolicyContent policiesSingleton={policiesSingleton} />
}

export const CancellationPolicyContent = () => {
  const [policiesSingleton, setPoliciesSingleton] = useState<
    Policies | undefined
  >(undefined)

  useEffect(() => {
    const fetchPolicies = async () => {
      const policies = await sanityQuery<Policies[]>(POLICIES_GROQ_QUERY)
      setPoliciesSingleton(policies.length > 0 ? policies[0] : undefined)
    }

    fetchPolicies()
  }, [])

  return <BookingPolicyContent policiesSingleton={policiesSingleton} />
}

export const BehaviourPolicyContent = () => {
  const [policiesSingleton, setPoliciesSingleton] = useState<
    Policies | undefined
  >(undefined)

  useEffect(() => {
    const fetchPolicies = async () => {
      const policies = await sanityQuery<Policies[]>(POLICIES_GROQ_QUERY)
      setPoliciesSingleton(policies.length > 0 ? policies[1] : undefined)
    }

    fetchPolicies()
  }, [])

  return <BookingPolicyContent policiesSingleton={policiesSingleton} />
}

enum PolicyPage {
  ONE,
  TWO,
  THREE
}
const exampleHeadings = [
  {
    title: "LODGE BOOKINGS",
    content: <LodgeBookingsPolicyContent />,
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

"use client"

import React, { useState } from "react"
import TabsComponent from "@/components/generic/TabsComponent/TabsComponent"
import type { PolicyWithTextBlocks } from "../Booking/BookingContext"

enum PolicyPage {
  LODGE_BOOKINGS = 0, // Start from 0 for better indexing
  CANCELLATION = 1,
  BEHAVIOUR = 2
}

export interface PoliciesInfo {
  /**
   * **Pre-formatted** content that should be displayed to the user
   */
  policiesArray?: PolicyWithTextBlocks[]
}

const exampleHeadings = [
  {
    title: "LODGE BOOKINGS",
    order: PolicyPage.LODGE_BOOKINGS
  },
  {
    title: "CANCELLATION",
    order: PolicyPage.CANCELLATION
  },
  {
    title: "BEHAVIOUR",
    order: PolicyPage.BEHAVIOUR
  }
]

export const PolicyTabs = ({ policiesArray }: PoliciesInfo) => {
  const [index, setIndex] = useState<PolicyPage>(PolicyPage.LODGE_BOOKINGS)

  // Sort policies based on their order
  const sortedPolicies = (policiesArray || []).sort((a, b) => {
    return (a.order ?? Number.MAX_VALUE) - (b.order ?? Number.MAX_VALUE)
  })

  // Map children (policies) to the corresponding tabs
  const tabsWithContent = sortedPolicies.map((policy) => ({
    order: policy.order !== undefined ? policy.order : Number.MAX_VALUE,
    title: policy.title || exampleHeadings[policy.order || 0].title,
    content: policy.information ? (
      policy.information
    ) : (
      <div>No content available</div>
    )
  }))

  return (
    <TabsComponent
      tabs={tabsWithContent}
      selectedIndex={index}
      setCurrentIndex={setIndex}
    />
  )
}

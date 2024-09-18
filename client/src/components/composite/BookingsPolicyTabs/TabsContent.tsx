"use client"

import React, { useState } from "react"
import TabsComponent from "@/components/generic/TabsComponent/TabsComponent"

enum PolicyPage {
  ONE,
  TWO,
  THREE
}

export interface PoliciesInfo {
  /**
   * **Pre-formatted** content that should be displayed to the user
   */
  policiesArray?: JSX.Element[]
}

const exampleHeadings = [
  {
    title: "LODGE BOOKINGS",
    content: "This is the content for the first tab",
    index: PolicyPage.ONE
  },
  {
    title: "CANCELLATION",
    index: PolicyPage.TWO
  },
  {
    title: "BEHAVIOUR",
    index: PolicyPage.THREE
  }
]

export const PolicyTabs = ({ policiesArray }: PoliciesInfo) => {
  const [index, setIndex] = useState<PolicyPage>(PolicyPage.ONE)

  // Map children to the corresponding tabs
  const tabsWithContent = exampleHeadings.map((heading, idx) => ({
    ...heading,
    content: policiesArray?.[idx] || <div>No content available</div>
  }))

  return (
    <TabsComponent
      tabs={tabsWithContent}
      selectedIndex={index}
      setCurrentIndex={setIndex}
    />
  )
}

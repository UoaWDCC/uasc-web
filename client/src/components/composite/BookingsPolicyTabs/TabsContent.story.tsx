import type { Meta } from "@storybook/react"
import { PolicyTabs } from "./TabsContent"
import { PortableText } from "next-sanity"

const meta: Meta = {
  component: PolicyTabs
}

const PoliciesContent = [
  {
    order: 0,
    title: "LODGE BOOKINGS",
    information: (
      <PortableText
        value={[
          {
            _key: "1",
            _type: "block",
            children: [
              {
                _key: "2",
                _type: "span",
                marks: [],
                text: "This is the lodge bookings policy"
              }
            ],
            markDefs: [],
            style: "normal"
          }
        ]}
      />
    )
  },
  {
    order: 1,
    title: "CANCELLATION",
    information: (
      <PortableText
        value={[
          {
            _key: "3",
            _type: "block",
            children: [
              {
                _key: "4",
                _type: "span",
                marks: [],
                text: "This is the cancellation policy"
              }
            ],
            markDefs: [],
            style: "normal"
          }
        ]}
      />
    )
  },
  {
    order: 2,
    title: "BEHAVIOUR",
    information: (
      <PortableText
        value={[
          {
            _key: "5",
            _type: "block",
            children: [
              {
                _key: "6",
                _type: "span",
                marks: [],
                text: "This is the behaviour policy"
              }
            ],
            markDefs: [],
            style: "normal"
          }
        ]}
      />
    )
  }
]

export default meta
export const DefaultPolicyTabs = () => {
  return <PolicyTabs policiesArray={PoliciesContent} />
}

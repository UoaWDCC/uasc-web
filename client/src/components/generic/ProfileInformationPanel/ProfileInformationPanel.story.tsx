import type { Meta, StoryObj } from "@storybook/react"

import ProfileInformationPanel from "./ProfileInformationPanel"

const meta: Meta<typeof ProfileInformationPanel> = {
  component: ProfileInformationPanel
}
export default meta
type Story = StoryObj<typeof ProfileInformationPanel>

interface TestElements {
  subtitle: string
  description: string
}

const ChildMapper = (children: Array<TestElements>) => {
  return children.map((child) => (
    <>
      <div>
        <p className="pb-1 text-base font-normal leading-tight text-stone-300">
          {child.subtitle}
        </p>
        <p className="text-black/opacity-20 pb-1 text-base font-normal leading-tight">
          {child.description}
        </p>
      </div>
    </>
  ))
}

const firstStoryElements: Array<TestElements> = [
  {
    subtitle: "Dietary requirements",
    description: "Allergic to nuts"
  },
  {
    subtitle: "Skiier/Snowboarder",
    description: "Both"
  }
]

const secondStoryElements = [
  {
    subtitle: "Name",
    description: "John Doe"
  },
  {
    subtitle: "Gender",
    description: "Male"
  },
  {
    subtitle: "Student ID",
    description: "910867209"
  },
  {
    subtitle: "Date of birth",
    description: "23/06/2003"
  },
  {
    subtitle: "Email",
    description: "email@domain.com"
  },
  {
    subtitle: "Phone number",
    description: "021 123 1234"
  },
  {
    subtitle: "Emergency contact info",
    description: "Jason, Father, 021 432, 4321"
  }
]

const thirdStoryElements = [
  {
    subtitle: "Membership type",
    description: "UoA Student"
  },
  {
    subtitle: "Valid till",
    description: "9/12/24"
  }
]

export const littleElementsWithEdit = () => {
  return (
    <ProfileInformationPanel
      title="Additional details"
      onEdit={() => {
        alert("Additional details button clicked")
      }}
    >
      {ChildMapper(firstStoryElements)}
    </ProfileInformationPanel>
  )
}

export const ManyElementsWithEdit: Story = {
  args: {
    title: "Personal Details",
    onEdit: () => {
      alert("Personal details edit button")
    },
    children: ChildMapper(secondStoryElements)
  }
}

export const elementsWithoutEdit = () => {
  return (
    <ProfileInformationPanel title="Membership">
      {ChildMapper(thirdStoryElements)}
    </ProfileInformationPanel>
  )
}

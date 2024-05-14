import type { Meta, StoryObj } from "@storybook/react"

import ProfileInformationPanel from "./ProfileInformationPanel"

const meta: Meta<typeof ProfileInformationPanel> = {
  component: ProfileInformationPanel
}

export default meta
type Story = StoryObj<typeof ProfileInformationPanel>

const firstStoryElements = [
  {
    subtitle: "Dietary requirements",
    description: "Allergic to nuts"
  },
  {
    subtitle: "Skiier/Snowboarder",
    description: "Both"
  }
]

export const littleElementsWithEdit: Story = {
  decorators: [
    () => {
      return (
        <>
          <ProfileInformationPanel
            title="Additional details"
            onEdit={() => {
              alert("button clicked")
            }}
          >
            {firstStoryElements.map((x) => (
              <>
                <div>
                  <p className="text-base font-normal leading-tight text-stone-300">
                    {x.subtitle}
                  </p>
                  <p className="text-black/opacity-20 text-base font-normal leading-tight">
                    {x.description}
                  </p>
                </div>
              </>
            ))}
          </ProfileInformationPanel>
        </>
      )
    }
  ]
}

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
export const ManyElementsWithEdit: Story = {
  args: {
    title: "Personal Details",
    onEdit: () => {
      alert("lol")
    },
    children: [
      <>
        {secondStoryElements.map((x) => (
          <>
            <div>
              <p className="text-base font-normal leading-tight text-stone-300">
                {x.subtitle}
              </p>
              <p className="text-black/opacity-20 text-base font-normal leading-tight">
                {x.description}
              </p>
            </div>
          </>
        ))}
      </>
    ]
  }
}

export const elementsWithoutEdit = {
  args: {
    title: "Membership",
    children: [
      <>
        {thirdStoryElements.map((x) => (
          <>
            <div>
              <p className="text-base font-normal leading-tight text-stone-300">
                {x.subtitle}
              </p>
              <p className="text-black/opacity-20 text-base font-normal leading-tight">
                {x.description}
              </p>
            </div>
          </>
        ))}
      </>
    ]
  }
}

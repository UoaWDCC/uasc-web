import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import PaginatedForm from "./PaginatedForm"

const meta: Meta<typeof PaginatedForm> = {
  component: PaginatedForm
}

export default meta
type Story = StoryObj<typeof PaginatedForm>

export const Default: Story = {}

export const ExampleUsage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const PageContents = [<p key="">First Page</p>]

  const PageProps = [
    {
      title: "First Page",
      index: 0,
      onNext: () => {
        setCurrentPage(1)
      },
      onBack: () => {},
      backButtonText: "Exit"
    },

    {
      title: "Second Page",
      index: 0,
      onBack: () => {
        setCurrentPage(0)
      }
    }
  ]

  return (
    <PaginatedForm pages={PageProps} currentPageIndex={currentPage}>
      {PageContents[currentPage]}
    </PaginatedForm>
  )
}

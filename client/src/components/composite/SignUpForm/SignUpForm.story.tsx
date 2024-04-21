// Example copied off https://storybook.js.org/docs/get-started/setup
import type { Meta } from "@storybook/react"

import { SignUpForm } from "./SignUpForm"
import { useState } from "react"
import { PAGE_CONTENT } from "./PageConfig/PageConfig"

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm
}

export default meta

export const DefaultStory = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  return (
    <SignUpForm
      pages={[
        {
          title: "name",
          index: 0,
          onNext: () => {
            setCurrentPage(1)
          }
        },
        {
          title: "first",
          index: 1,
          onNext: () => {
            setCurrentPage(2)
          },
          onBack: () => {
            setCurrentPage(0)
          }
        },
        {
          title: "second",
          index: 2,
          onNext: () => {
            setCurrentPage(3)
          },
          onBack: () => {
            setCurrentPage(1)
          }
        },
        {
          title: "fourth",
          index: 3,

          onNext: () => {
            setCurrentPage(4)
          },
          onBack: () => {
            setCurrentPage(2)
          }
        },
        {
          title: "fifth",
          index: 4,
          onNext: () => {
            setCurrentPage(5)
          },
          onBack: () => {
            setCurrentPage(3)
          }
        },

        {
          title: "sixth",
          index: 5,
          onNext: () => {
            setCurrentPage(6)
          },
          onBack: () => {
            setCurrentPage(4)
          }
        },
        {
          title: "",
          index: 6,
          onBack: () => {
            setCurrentPage(5)
          }
        }
      ]}
      pageContent={PAGE_CONTENT}
      currentPage={currentPage}
    />
  )
}

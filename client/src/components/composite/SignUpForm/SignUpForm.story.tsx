// Example copied off https://storybook.js.org/docs/get-started/setup
import type { Meta } from "@storybook/react"

import { SignUpForm } from "./SignUpForm"
import { useState } from "react"
import { PAGE_CONTENT } from "./PageConfig/PageConfig"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "services/QueryClient"
import { MemoryRouter } from "react-router-dom"

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  tags: ["autodocs"]
}

export default meta

/**
 * Run the backend with `yarn dev-server` if you want real data
 * TODO: create mocks
 */
export const DefaultStory = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
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
              title: "Confirmation",
              index: 6,
              onBack: () => {
                setCurrentPage(5)
              },
              onNext: () => {
                setCurrentPage(7)
              }
            },
            {
              title: "Account setup",
              index: 7,
              onBack: () => {
                setCurrentPage(6)
              }
            }
          ]}
          pageContent={PAGE_CONTENT}
          currentPage={currentPage}
        />
      </QueryClientProvider>
    </MemoryRouter>
  )
}

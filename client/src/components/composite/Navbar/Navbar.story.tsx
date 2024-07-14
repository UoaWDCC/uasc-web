// Example copied off https://storybook.js.org/docs/get-started/setup
import type { Meta, StoryObj } from "@storybook/react"

import Navbar from "./Navbar"
import { useState } from "react"
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider/next-13.5"

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Navbar> = {
  component: Navbar
}

export default meta
type Story = StoryObj<typeof Navbar>

export const LoggedInNavbar: Story = {
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    )
  ],
  args: {
    isLoggedIn: true
  }
}

export const LoggedOutNavbar: Story = {
  decorators: [
    (Story) => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    )
  ],
  args: {
    isLoggedIn: false
  }
}

export const LoginAndSignout = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const signInHandler = () => {
    setLoggedIn(true)
  }
  const signOutHandler = () => {
    setLoggedIn(false)
  }
  return (
    <>
      <MemoryRouterProvider>
        <Navbar
          signInHandler={signInHandler}
          signOutHandler={signOutHandler}
          isLoggedIn={loggedIn}
        />
      </MemoryRouterProvider>
    </>
  )
}

import { useState } from "react"
import Navbar, { INavbarProps } from "./Navbar"
import { act, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

const TestNavbar = ({
  defaultState,
  signInHandler = () => {},
  signOutHandler = () => {}
}: { defaultState: boolean } & Partial<INavbarProps>) => {
  const [isSignedIn, setIsSignedIn] = useState(defaultState)
  const signOut = () => {
    signInHandler()
    setIsSignedIn(false)
  }
  const signIn = () => {
    signOutHandler()
    setIsSignedIn(true)
  }
  return (
    <BrowserRouter>
      <Navbar
        signInHandler={signIn}
        signOutHandler={signOut}
        isLoggedIn={isSignedIn}
      />
    </BrowserRouter>
  )
}

describe("navbar", () => {
  it("Should display profile icon when signed in", async () => {
    const login = jest.fn()
    const logout = jest.fn()
    render(
      <TestNavbar
        defaultState={false}
        signInHandler={login}
        signOutHandler={logout}
      />
    )
    const signInButton = screen.getByTestId("sign-in-button")

    await act(async () => {
      await signInButton.click()
    })

    expect(signInButton).not.toBeVisible()

    const profileIcon = screen.getByTestId("profile-icon")
    expect(profileIcon).toBeVisible()
  })

  it("Should display sign out button when signed out", async () => {
    const login = jest.fn()
    const logout = jest.fn()
    render(
      <TestNavbar
        defaultState={true}
        signInHandler={login}
        signOutHandler={logout}
      />
    )

    const profileIcon = screen.getByTestId("profile-icon")
    expect(profileIcon).toBeVisible()

    // open menu - updates state so need to call act
    await act(async () => {
      await profileIcon.click()
    })

    const signOutLink = screen.getByTestId("sign-out-link")

    await act(async () => {
      await signOutLink.click()
    })

    expect(profileIcon).not.toBeVisible()

    expect(screen.getByTestId("sign-in-button")).toBeVisible()
  })
})

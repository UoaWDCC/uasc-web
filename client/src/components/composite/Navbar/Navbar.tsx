import { NavLink } from "react-router-dom"
import WrappedMenuTab from "./WrappedTabs/WrappedMenuTab"
import WrappedTab from "./WrappedTabs/WrappedTab"
import ProfileIcon from "assets/icons/profile.svg?react"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { useState } from "react"
import MenuList from "components/generic/MenuList/MenuList"

export interface INavbarProps {
  signInHandler: () => void
  signOutHandler: () => void
  isLoggedIn: boolean
}

const ProfileButton = ({
  signOutHandler
}: Pick<INavbarProps, "signOutHandler">) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  return (
    <div className="relative mb-2 h-4 w-4 cursor-pointer self-center">
      <ProfileIcon
        data-testid="profile-icon"
        className="fill-black"
        onClick={() => setIsOpened(!isOpened)}
      />

      {isOpened && (
        <span className="w-min-[150%] absolute right-0 top-[calc(100%+13px)]">
          <MenuList anchor="right">
            <NavLink
              data-testid="sign-out-link"
              className="text-nowrap"
              to="/login"
              onClick={signOutHandler}
            >
              Log Out
            </NavLink>
          </MenuList>
        </span>
      )}
    </div>
  )
}

const LoginIndicator = ({
  signInHandler,
  signOutHandler,
  isLoggedIn
}: INavbarProps) => {
  if (isLoggedIn) {
    return <ProfileButton signOutHandler={signOutHandler} />
  }
  return (
    <Button
      variant="inverted-default-sm"
      data-testid="sign-in-button"
      className="self-start"
      onClick={signInHandler}
    >
      Sign In
    </Button>
  )
}

const navStyle = (active: boolean) => (active ? "text-light-blue-100" : "")

const Navbar = (props: INavbarProps) => {
  return (
    <div className="bg-gray-1 navbar-shadow fixed flex w-screen px-4 pt-3">
      <div className="flex w-full">
        <div className="ml-auto flex items-end justify-center gap-8 self-end pr-4">
          <WrappedTab to="/">Home</WrappedTab>
          <WrappedTab to="/bookings">Bookings</WrappedTab>
          <WrappedTab to="/events">Events</WrappedTab>
          <WrappedMenuTab displayName="about" to="/about">
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/faq">
              FAQ
            </NavLink>
            <NavLink
              className={({ isActive }) => navStyle(isActive)}
              to="/policy"
            >
              Policy
            </NavLink>
            <NavLink
              className={({ isActive }) => navStyle(isActive)}
              to="/contact"
            >
              Contact
            </NavLink>
          </WrappedMenuTab>
          <LoginIndicator {...props} />
        </div>
      </div>
    </div>
  )
}

export default Navbar

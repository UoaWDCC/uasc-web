import { NavLink } from "react-router-dom"
import WrappedMenuTab from "./WrappedTabs/WrappedMenuTab"
import WrappedTab from "./WrappedTabs/WrappedTab"
import ProfileIcon from "assets/icons/profile.svg?react"
import Button from "components/generic/FigmaButtons/FigmaButton"

interface INavbarProps {
  signInHandler: () => void
  signOutHandler: () => void
  isLoggedIn: boolean
}

const LoginIndicator = ({
  signInHandler,
  signOutHandler,
  isLoggedIn
}: INavbarProps) => {
  if (isLoggedIn) {
    return (
      <div className="mb-2 h-4 w-4 cursor-pointer self-center">
        <ProfileIcon className="  fill-black" onClick={signOutHandler} />
      </div>
    )
  }
  return (
    <Button
      variant="inverted-default"
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
    <div className="bg-gray-1 navbar-shadow flex px-4 pt-3">
      <div className="ml-auto flex items-end justify-center gap-6">
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
  )
}

export default Navbar

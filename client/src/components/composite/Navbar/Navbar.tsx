import { Link, NavLink } from "react-router-dom"
import WrappedMenuTab from "./utils/WrappedMenuTab"
import WrappedTab from "./utils/WrappedTab"
import UASCLogo from "assets/logos/UASC-LOGO-White.svg?react"
import LoginIndicator from "./utils/LoginIndicator"

export interface INavbarProps {
  signInHandler: () => void
  signOutHandler: () => void
  isLoggedIn: boolean
}

const Logo = () => {
  return (
    <Link to="/">
      <div className="h-[39px] w-[36px]">
        <UASCLogo className=" fill-light-blue-100" />
      </div>
    </Link>
  )
}

const navStyle = (active: boolean) => (active ? "text-light-blue-100" : "")

const Navbar = (props: INavbarProps) => {
  return (
    <div className="bg-gray-1 navbar-shadow fixed z-[999] flex w-screen px-4 pt-3">
      <div className="flex w-full">
        <Logo />
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

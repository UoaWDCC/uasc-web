import { Link, NavLink } from "react-router-dom"
import WrappedMenuTab from "./utils/WrappedMenuTab"
import { MobileWrappedTab, WrappedTab } from "./utils/WrappedTab"
import UASCLogo from "assets/logos/UASC-LOGO-White.svg?react"
import HamburgerIcon from "assets/icons/hamburger.svg?react"
import CrossIcon from "assets/icons/x.svg?react"
import LoginIndicator from "./utils/LoginIndicator"
import { useState } from "react"

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

const AboutMenuItemsFull = () => {
  return (
    <>
      <NavLink className={({ isActive }) => navStyle(isActive)} to="/faq">
        FAQ
      </NavLink>
      <NavLink className={({ isActive }) => navStyle(isActive)} to="/policy">
        Policy
      </NavLink>
      <NavLink className={({ isActive }) => navStyle(isActive)} to="/contact">
        Contact
      </NavLink>
    </>
  )
}

const AboutMenuItemsMobile = () => {
  return (
    <>
      <MobileWrappedTab to="/faq">About</MobileWrappedTab>
      <MobileWrappedTab to="/faq">FAQ</MobileWrappedTab>
      <MobileWrappedTab to="/policy">Policy</MobileWrappedTab>
      <MobileWrappedTab to="/contact">Contact</MobileWrappedTab>
    </>
  )
}

const navStyle = (active: boolean) => (active ? "text-light-blue-100" : "")

const Navbar = (props: INavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  return (
    <div className="bg-gray-1 navbar-shadow fixed z-[999] flex w-screen px-4 pt-3">
      <div className="flex w-full">
        <Logo />
        <div
          className={`left-0 md:ml-auto ${isOpen ? "flex" : "hidden"} bg-gray-1 md:overflow-none absolute top-12
          min-h-screen w-full flex-col items-center justify-center gap-4 self-end overflow-auto md:relative md:top-0
          md:ml-auto md:flex md:min-h-full md:flex-row md:items-end md:justify-end md:gap-8 md:bg-none md:pr-4`}
        >
          <WrappedTab to="/">Home</WrappedTab>
          <WrappedTab to="/bookings">Bookings</WrappedTab>
          <WrappedTab to="/events">Events</WrappedTab>
          <span className="hidden md:block">
            <WrappedMenuTab displayName="about" to="/about">
              <AboutMenuItemsFull />
            </WrappedMenuTab>
          </span>
          <AboutMenuItemsMobile />
          <LoginIndicator {...props} />
        </div>

        <div
          className="ml-auto block h-[20px] w-[24px] cursor-pointer pt-[5px] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CrossIcon className="stroke-black" />
          ) : (
            <HamburgerIcon className="stroke-black" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

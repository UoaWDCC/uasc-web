import { Link, useLocation } from "react-router-dom"
import { WrappedTab } from "./utils/WrappedTab"
import UASCLogo from "assets/logos/UASC-LOGO-White.svg?react"
import HamburgerIcon from "assets/icons/hamburger.svg?react"
import LoginIndicator from "./utils/LoginIndicator"
import { useEffect, useState } from "react"

export interface INavbarProps {
  signInHandler: () => void
  signOutHandler: () => void
  isLoggedIn: boolean
  isAdmin?: boolean
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

const Navbar = ({
  signInHandler,
  signOutHandler,
  isLoggedIn,
  isAdmin
}: INavbarProps) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    /**
     * "Close navbar on route change"
     */
    setIsOpen(false)
  }, [location])

  const _signOutHandler = () => {
    signOutHandler()
    setIsOpen(false)
  }
  const _signInHandler = () => {
    signInHandler()
    setIsOpen(false)
  }
  return (
    <div className="bg-gray-1 navbar-shadow absolute z-[999] flex w-screen px-8 pt-3 md:fixed md:px-4">
      <div className="flex w-full">
        <Logo />
        <div
          className={`left-0 md:ml-auto ${isOpen ? "flex" : "hidden"} bg-gray-1 absolute top-12 h-fit min-h-screen
          w-full flex-col items-center justify-start gap-2 self-end py-8 md:relative md:top-0 md:ml-auto
          md:flex md:min-h-full md:flex-row md:items-end md:justify-end md:gap-8 md:bg-none md:py-0 md:pr-4`}
        >
          <WrappedTab to="/">Home</WrappedTab>
          <WrappedTab to="/bookings">Book the Lodge!</WrappedTab>
          <WrappedTab to="/about">About</WrappedTab>
          <LoginIndicator
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            signOutHandler={_signOutHandler}
            signInHandler={_signInHandler}
          />
        </div>

        <div
          className={`ml-auto block h-[20px] w-[24px] cursor-pointer md:hidden
          ${isOpen ? "stroke-light-blue-100" : "stroke-black"} " pt-[5px]`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <HamburgerIcon />
        </div>
      </div>
    </div>
  )
}

export default Navbar

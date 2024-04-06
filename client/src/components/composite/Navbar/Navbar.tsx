import Tab from "components/generic/Tab/Tab"
import { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"

const WrappedTab = ({
  children,
  to,
  subroutes
}: {
  children: ReactNode
  to: string
  subroutes?: string[]
}) => {
  const { pathname } = useLocation()

  return (
    <NavLink to={to} state={{ to }}>
      <Tab disabled={pathname === to || subroutes?.includes(pathname)}>
        {children}
      </Tab>
    </NavLink>
  )
}

const Navbar = () => {
  return (
    <div className="bg-gray-1 flex p-3">
      <div className="ml-auto flex gap-6">
        <WrappedTab to="/">Home</WrappedTab>
        <WrappedTab to="/bookings">Bookings</WrappedTab>
        <WrappedTab to="/signups">Signups</WrappedTab>
        <WrappedTab to="/events">Events</WrappedTab>
        <WrappedTab to="/about">About</WrappedTab>
      </div>
    </div>
  )
}

export default Navbar

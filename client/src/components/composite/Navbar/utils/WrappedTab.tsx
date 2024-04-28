import Tab from "components/generic/Tab/Tab"
import { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"

interface IWrappedTab {
  children: ReactNode
  to: string
  subroutes?: string[]
}

export const WrappedTab = ({ children, to, subroutes }: IWrappedTab) => {
  const { pathname } = useLocation()

  return (
    <NavLink to={to} state={{ to }}>
      <Tab
        aria-label={`link to ${to}`}
        disabled={pathname === to || subroutes?.includes(pathname)}
      >
        {children}
      </Tab>
    </NavLink>
  )
}

export const MobileWrappedTab = ({ children, to, subroutes }: IWrappedTab) => {
  return (
    <span className="md:hidden">
      <WrappedTab to={to} subroutes={subroutes}>
        {children}
      </WrappedTab>
    </span>
  )
}

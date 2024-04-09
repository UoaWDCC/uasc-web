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
      <Tab
        aria-label={`link to ${to}`}
        disabled={pathname === to || subroutes?.includes(pathname)}
      >
        {children}
      </Tab>
    </NavLink>
  )
}
export default WrappedTab

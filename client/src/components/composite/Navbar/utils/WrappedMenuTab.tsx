import MenuTab from "components/generic/MenuTab/MenuTab"
import { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
const WrappedMenuTab = ({
  displayName,
  children,
  to,
  subroutes
}: {
  displayName: string
  children: ReactNode
  to: string
  subroutes?: string[]
}) => {
  const { pathname } = useLocation()

  return (
    <NavLink to={to} state={{ to }}>
      <MenuTab
        displayText={displayName}
        disabled={pathname === to || subroutes?.includes(pathname)}
      >
        {children}
      </MenuTab>
    </NavLink>
  )
}
export default WrappedMenuTab

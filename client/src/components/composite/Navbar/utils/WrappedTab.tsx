import Tab from "components/generic/Tab/Tab"
import { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"

interface IWrappedTab {
  children: ReactNode
  to: string
  subroutes?: string[]
  mobileCompatiability?: boolean
}

export const WrappedTab = ({
  children,
  to,
  subroutes,
  mobileCompatiability = true
}: IWrappedTab) => {
  const { pathname } = useLocation()

  return (
    <NavLink
      to={to}
      state={{ to }}
      className="flex w-full px-8 md:w-fit md:px-0"
    >
      <Tab
        stretchesOnSmallScreen={mobileCompatiability}
        aria-label={`link to ${to}`}
        disabled={pathname === to || subroutes?.includes(pathname)}
      >
        {children}
      </Tab>
    </NavLink>
  )
}

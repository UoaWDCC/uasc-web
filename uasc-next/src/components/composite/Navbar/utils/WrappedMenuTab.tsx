import MenuTab from "@/components/generic/MenuTab/MenuTab"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
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
  const pathname = usePathname()

  return (
    <Link href={to}>
      <MenuTab
        displayText={displayName}
        disabled={pathname === to || subroutes?.includes(pathname)}
      >
        {children}
      </MenuTab>
    </Link>
  )
}
export default WrappedMenuTab

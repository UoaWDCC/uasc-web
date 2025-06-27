import MenuTab from "@/components/generic/MenuTab/MenuTab"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
const WrappedMenuTab = ({
  displayName,
  children,
  to
}: {
  displayName: string
  children: ReactNode
  to: string
}) => {
  const pathname = usePathname()

  return (
    <Link href={to}>
      <MenuTab
        displayText={displayName}
        // need to check with/without trailing
        disabled={pathname === `${to}/` || pathname === to}
      >
        {children}
      </MenuTab>
    </Link>
  )
}
export default WrappedMenuTab

import Tab from "@/components/generic/Tab/Tab"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface IWrappedTab {
  children: ReactNode
  to: string
  mobileCompatiability?: boolean
}

export const WrappedTab = ({
  children,
  to,
  mobileCompatiability = true
}: IWrappedTab) => {
  const pathname = usePathname()

  return (
    <Link
      href={to}
      className={`flex w-full ${mobileCompatiability ? "px-8" : "px-0"} md:w-fit md:px-0`}
    >
      <Tab
        stretchesOnSmallScreen={mobileCompatiability}
        aria-label={`link to ${to}`}
        // need to check with/without trailing
        disabled={pathname === `${to}/` || pathname === to}
      >
        {children}
      </Tab>
    </Link>
  )
}

import { Metadata } from "next"
import { ReactNode } from "react"
import FullPageBackgroundImage from "@/components/generic/FullPageBackgroundImage/FullPageBackgroundImage"

export const metadata: Metadata = {
  title: "UASC Merch",
  description: "Browse our collection UASC merch!"
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <FullPageBackgroundImage>{children}</FullPageBackgroundImage>
}

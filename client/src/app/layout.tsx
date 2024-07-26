import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppNavbar } from "@/components/composite/Navbar/AppNavbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UASC - University of Auckland Snowsports Club",
  description:
    "The University of Auckland Snowsports Clubs' aim is to encourage Snowsports amongst students of the University in a social and supportive environment whilst making it as affordable as possible."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <AppNavbar />
        <div className="pt-[51px]">{children}</div>
      </body>
    </html>
  )
}

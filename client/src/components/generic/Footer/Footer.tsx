import Link from "next/link"

import Facebook from "@/assets/icons/facebook.svg"

import Instagram from "@/assets/icons/instagram.svg"

const HorizontalDivider = () => (
  <>
    <span className="bg-gray-3 hidden h-[12px] w-[1px] lg:block" />
  </>
)

export const Footer = () => {
  return (
    <div
      className="text-gray-3 flex h-fit min-h-[56px] w-full flex-col justify-center gap-3 border
     border-black bg-black py-2 lg:flex-row lg:items-center lg:text-nowrap lg:pl-[32px]"
    >
      <h5 className="flex items-center justify-center text-center uppercase">
        COPYRIGHT {new Date().getFullYear()} University of Auckland Snowsports
        Club
      </h5>

      <div
        className="flex w-full flex-col items-center justify-center
       gap-3 lg:flex-row lg:items-center lg:justify-start"
      >
        <HorizontalDivider />

        <Link href="/login">
          <h5 className="uppercase">log in</h5>
        </Link>

        <HorizontalDivider />

        <Link href="/register">
          <h5 className="uppercase">register</h5>
        </Link>

        <HorizontalDivider />

        <Link href="/bookings">
          <h5 className="uppercase">book the lodge</h5>
        </Link>

        <HorizontalDivider />

        <Link href="/about">
          <h5 className="uppercase">about</h5>
        </Link>

        <HorizontalDivider />

        <Link href="/contact">
          <h5 className="uppercase">contact</h5>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-6 px-4 lg:ml-auto">
        <div className="h-[24px] w-[24px]">
          <Link href="https://www.instagram.com/uasc_nz/" target="blank">
            <Instagram className="fill-white" />
          </Link>
        </div>

        <div className="h-[24px] w-[24px]">
          <Link href="https://www.facebook.com/UoAsnowsports/" target="blank">
            <Facebook className="fill-white" />
          </Link>
        </div>
      </div>
    </div>
  )
}

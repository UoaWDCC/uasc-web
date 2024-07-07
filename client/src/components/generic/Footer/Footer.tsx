import { Link } from "react-router-dom"

import Facebook from "assets/icons/facebook.svg?react"

import Instagram from "assets/icons/instagram.svg?react"

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

        <Link to="/login">
          <h5 className="uppercase">log in</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/register">
          <h5 className="uppercase">register</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/bookings">
          <h5 className="uppercase">book the lodge</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/about">
          <h5 className="uppercase">about</h5>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-6 px-4 lg:ml-auto">
        <div className="h-[24px] w-[24px]">
          <a href="https://www.instagram.com/uasc_nz/" target="blank">
            <Instagram className="fill-white" />
          </a>
        </div>

        <div className="h-[24px] w-[24px]">
          <a href="https://www.facebook.com/UoAsnowsports/" target="blank">
            <Facebook className="fill-white" />
          </a>
        </div>
      </div>
    </div>
  )
}

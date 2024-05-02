import { Link } from "react-router-dom"

import Facebook from "assets/icons/facebook.svg?react"

import Instagram from "assets/icons/instagram.svg?react"

const HorizontalDivider = () => <span className="bg-gray-3 h-[12px] w-[1px]" />

export const Footer = () => {
  return (
    <div className="text-gray-3 flex h-[56px] w-full justify-center gap-3 border border-black bg-black sm:items-center lg:text-nowrap lg:pl-[32px]">
      <h5 className="flex items-center justify-center text-center uppercase">
        COPYRIGHT {new Date().getFullYear()} University of Auckland Snowsports
        Club
      </h5>

      <div className="hidden items-center justify-center gap-3 lg:flex">
        <HorizontalDivider />

        <Link to="/about">
          <h5 className="uppercase">About</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/faq">
          <h5 className="uppercase">faq</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/contact">
          <h5 className="uppercase">contact us</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/policy">
          <h5 className="uppercase">policy</h5>
        </Link>
      </div>

      <div className="ml-auto hidden items-center gap-6 pr-[32px] lg:flex">
        <span>
          <a href="https://www.instagram.com/uasc_nz/" target="blank">
            <Instagram className="fill-white" />
          </a>
        </span>

        <span className="h-[24px] w-[24px]">
          <a href="https://www.facebook.com/UoAsnowsports/" target="blank">
            <Facebook className="fill-white" />
          </a>
        </span>
      </div>
    </div>
  )
}

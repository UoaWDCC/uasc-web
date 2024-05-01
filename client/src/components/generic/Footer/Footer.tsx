import { Link } from "react-router-dom"

import Facebook from "assets/icons/facebook.svg?react"

const HorizontalDivider = () => <span className="bg-gray-3 h-[12px] w-[1px]" />

export const Footer = () => {
  return (
    <div className="text-gray-3 flex h-[56px] w-full items-center justify-center gap-2 border border-black bg-black">
      <h5 className="uppercase">
        COPYRIGHT {new Date().getFullYear()} University of Auckland Snowsports
        Club
      </h5>

      <Link to="/about">
        <h5 className="uppercase">About</h5>
      </Link>
      <HorizontalDivider />
      <span className="h-[24px] w-[24px]">
        <a href="https://facebook.com" target="blank">
          <Facebook className="fill-white" />
        </a>
      </span>
    </div>
  )
}

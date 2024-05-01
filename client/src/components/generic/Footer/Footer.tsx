import { Link } from "react-router-dom"

import Facebook from "assets/icons/facebook.svg?react"
import Twitter from "assets/icons/twitter.svg?react"
import Instagram from "assets/icons/instagram.svg?react"
import Snapchat from "assets/icons/snapchat.svg?react"

const HorizontalDivider = () => <span className="bg-gray-3 h-[12px] w-[1px]" />

export const Footer = () => {
  return (
    <div className="text-gray-3 flex h-[56px] w-full items-center justify-center gap-3 border border-black bg-black">
      <h5 className="uppercase">
        COPYRIGHT {new Date().getFullYear()} University of Auckland Snowsports
        Club
      </h5>

      <div className="flex gap-3 items-center justify-center">
        <HorizontalDivider />

        <Link to="/about">
          <h5 className="uppercase">About</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/faq">
          <h5 className="uppercase">faq</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/contact us">
          <h5 className="uppercase">contact us</h5>
        </Link>

        <HorizontalDivider />

        <Link to="/policy">
          <h5 className="uppercase">policy</h5>
        </Link>
      </div>

      <div className="flex gap-2">
        <span>
          <a href="https://instagram.com" target="blank">
            <Instagram className="fill-white" />
          </a>
        </span>

        <span>
          <a href="https://twitter.com" target="blank">
            <Twitter className="fill-white" />
          </a>
        </span>

        <span className="h-[24px] w-[24px]">
          <a href="https://facebook.com" target="blank">
            <Facebook className="fill-white" />
          </a>
        </span>

        <span>
          <a href="https://snapchat.com" target="blank">
            <Snapchat className="fill-white" />
          </a>
        </span>
      </div>
    </div>
  )
}

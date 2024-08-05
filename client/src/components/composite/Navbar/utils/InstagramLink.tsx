import InstagramNavbarIcon from "@/assets/icons/InstagramNavbar.svg"
import Link from "next/link"

const InstagramLink = () => {
  return (
    <Link
      href="https://www.instagram.com/uasc_nz/"
      target="_blank"
      rel="noreferrer"
      className="text-dark-blue-100 pb-2"
    >
      <InstagramNavbarIcon />
    </Link>
  )
}

export default InstagramLink

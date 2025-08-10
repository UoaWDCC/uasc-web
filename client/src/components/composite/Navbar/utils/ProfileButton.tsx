import MenuList from "@/components/generic/MenuList/MenuList"
import ProfileIcon from "@/assets/icons/profile.svg"
import type { INavbar } from "../Navbar"
import { useRef, useState } from "react"
import { useClickOutside } from "@/components/utils/Utils"
import Link from "next/link"

const ProfileButton = ({
  signOutHandler,
  isAdmin
}: Pick<INavbar, "signOutHandler" | "isAdmin">) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutside(menuRef, () => {
    setIsOpened(false)
  })
  return (
    <div
      ref={menuRef}
      className="relative mb-2 h-4 w-4 cursor-pointer self-center"
    >
      <ProfileIcon
        data-testid="profile-icon"
        className="fill-black"
        onClick={() => setIsOpened(!isOpened)}
      />

      {isOpened && (
        <span className="w-min-[150%] absolute right-0 top-[calc(100%+13px)]">
          <MenuList anchor="right">
            {isAdmin && (
              <Link
                data-testid="admin-link"
                className="text-nowrap"
                href="/admin"
              >
                Admin
              </Link>
            )}
            <Link
              data-testid="profile-link"
              className="text-nowrap"
              href="/profile"
            >
              Profile
            </Link>
            <Link
              data-testid="sign-out-link"
              className="text-nowrap"
              href="/login"
              onClick={signOutHandler}
            >
              Log Out
            </Link>
          </MenuList>
        </span>
      )}
    </div>
  )
}
export default ProfileButton

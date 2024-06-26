import MenuList from "components/generic/MenuList/MenuList"
import ProfileIcon from "assets/icons/profile.svg?react"
import { NavLink } from "react-router-dom"
import { INavbarProps } from "../Navbar"
import { useRef, useState } from "react"
import { useClickOutside } from "components/utils/Utils"

const ProfileButton = ({
  signOutHandler,
  isAdmin
}: Pick<INavbarProps, "signOutHandler" | "isAdmin">) => {
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
              <NavLink
                data-testid="admin-link"
                className="text-nowrap"
                to="/admin"
              >
                Admin
              </NavLink>
            )}
            <NavLink
              data-testid="profile-link"
              className="text-nowrap"
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              data-testid="sign-out-link"
              className="text-nowrap"
              to="/login"
              onClick={signOutHandler}
            >
              Log Out
            </NavLink>
          </MenuList>
        </span>
      )}
    </div>
  )
}
export default ProfileButton

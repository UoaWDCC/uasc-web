import MenuList from "components/generic/MenuList/MenuList"
import ProfileIcon from "assets/icons/profile.svg?react"
import { NavLink } from "react-router-dom"
import { INavbarProps } from "../Navbar"
import { useState } from "react"

const ProfileButton = ({
  signOutHandler
}: Pick<INavbarProps, "signOutHandler">) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  return (
    <div className="relative mb-2 h-4 w-4 cursor-pointer self-center">
      <ProfileIcon
        data-testid="profile-icon"
        className="fill-black"
        onClick={() => setIsOpened(!isOpened)}
      />

      {isOpened && (
        <span className="w-min-[150%] absolute right-0 top-[calc(100%+13px)]">
          <MenuList anchor="right">
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

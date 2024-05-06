import Button from "components/generic/FigmaButtons/FigmaButton"
import { INavbarProps } from "../Navbar"
import ProfileButton from "./ProfileButton"
import { MobileWrappedTab } from "./WrappedTab"

const LoginIndicator = ({
  signInHandler,
  signOutHandler,
  isLoggedIn
}: INavbarProps) => {
  if (isLoggedIn) {
    return (
      <>
        {/* Desktop View */}
        <span className="hidden md:block md:self-center">
          <ProfileButton signOutHandler={signOutHandler} />
        </span>
        {/* Mobile View */}
        <span className="md:hidden w-full">
          <MobileWrappedTab to="/profile">Profile</MobileWrappedTab>
        </span>
        <h3 className="text-left w-full pl-8 text md:hidden cursor-pointer 
          text-light-blue-100" onClick={signOutHandler}>Sign Out</h3>
      </>
    )
  }
  return (
    <>
      {/* Desktop View */}
      <Button
        variant="inverted-default-sm"
        data-testid="sign-in-button"
        className="md:mb-2 md:self-center hidden md:block"
        onClick={signInHandler}
      >
        Log In
      </Button>
      {/* Mobile View */}
      <h3 className="text-left w-full pl-8 text md:hidden 
      cursor-pointer text-light-blue-100" onClick={signInHandler}>Sign In</h3>
    </>
  )
}

export default LoginIndicator

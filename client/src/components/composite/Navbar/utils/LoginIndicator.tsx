import Button from "components/generic/FigmaButtons/FigmaButton"
import { INavbarProps } from "../Navbar"
import ProfileButton from "./ProfileButton"
import { WrappedTab } from "./WrappedTab"

const LoginIndicator = ({
  signInHandler,
  signOutHandler,
  isLoggedIn,
  isAdmin
}: INavbarProps) => {
  if (isLoggedIn) {
    return (
      <>
        {/* Desktop View */}
        <span className="hidden md:block md:self-center">
          <ProfileButton isAdmin={isAdmin} signOutHandler={signOutHandler} />
        </span>
        {/* Mobile View */}
        <span className="w-full md:hidden">
          <WrappedTab to="/profile">Profile</WrappedTab>
        </span>
        {isAdmin && (
          <span className="w-full md:hidden">
            <WrappedTab to="/admin">Admin</WrappedTab>
          </span>
        )}
        <h3
          className="text text-light-blue-100 w-full cursor-pointer pl-8 text-left 
          md:hidden"
          onClick={signOutHandler}
        >
          Sign Out
        </h3>
      </>
    )
  }
  return (
    <>
      {/* Desktop View */}
      <Button
        variant="inverted-default-sm"
        data-testid="sign-in-button"
        className="hidden md:mb-2 md:block md:self-center"
        onClick={signInHandler}
      >
        Log In
      </Button>
      {/* Mobile View */}
      <h3
        className="text text-light-blue-100 w-full cursor-pointer pl-8 
      text-left md:hidden"
        onClick={signInHandler}
      >
        Sign In
      </h3>
    </>
  )
}

export default LoginIndicator

import Button from "components/generic/FigmaButtons/FigmaButton"
import { INavbarProps } from "../Navbar"
import ProfileButton from "./ProfileButton"

const LoginIndicator = ({
  signInHandler,
  signOutHandler,
  isLoggedIn
}: INavbarProps) => {
  if (isLoggedIn) {
    return (
      <>
        <span className="hidden md:block">
          <ProfileButton signOutHandler={signOutHandler} />
        </span>

        <span className="md:hidden">
          <Button
            variant="inverted-default-sm"
            data-testid="sign-out-button"
            className="md:self-start"
            onClick={signOutHandler}
          >
            Sign Out
          </Button>
        </span>
      </>
    )
  }
  return (
    <Button
      variant="inverted-default-sm"
      data-testid="sign-in-button"
      className="md:self-start"
      onClick={signInHandler}
    >
      Sign In
    </Button>
  )
}

export default LoginIndicator

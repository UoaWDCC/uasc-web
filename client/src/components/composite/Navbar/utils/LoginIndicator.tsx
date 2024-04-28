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
        <span className="hidden md:block md:self-center">
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
      className="md:mb-2 md:self-center"
      onClick={signInHandler}
    >
      Sign In
    </Button>
  )
}

export default LoginIndicator

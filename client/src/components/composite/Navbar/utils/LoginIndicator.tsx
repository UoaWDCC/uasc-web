import Button from "components/generic/FigmaButtons/FigmaButton"
import { INavbarProps } from "../Navbar"
import ProfileButton from "./ProfileButton"

const LoginIndicator = ({
  signInHandler,
  signOutHandler,
  isLoggedIn
}: INavbarProps) => {
  if (isLoggedIn) {
    return <ProfileButton signOutHandler={signOutHandler} />
  }
  return (
    <Button
      variant="inverted-default-sm"
      data-testid="sign-in-button"
      className="self-start"
      onClick={signInHandler}
    >
      Sign In
    </Button>
  )
}

export default LoginIndicator

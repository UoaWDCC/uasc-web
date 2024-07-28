import { useRouter } from "next/navigation"
import Button from "../FigmaButtons/FigmaButton"

interface ISignUpNotif {
  /**
   * If there is a currently signed in user which determines the view to be shown
   */
  signedIn?: boolean
}

/**
 * For use in the bookings page when a non-signed in/guest member tries to view
 */
export const SignUpNotif = ({ signedIn }: ISignUpNotif) => {
  const router = useRouter()
  function goToRegister() {
    router.push("/register")
  }
  function goToLogin() {
    router.push("/login")
  }

  return (
    <div
      className="text-dark-blue-100 border-gray-3 flex flex-col items-center justify-center 
    gap-4 rounded-md border bg-white py-8"
    >
      <h2 className="text-center italic">Currently unavailable</h2>
      <h4 className="max-h-[87px] max-w-[386px] text-center">
        Only paid members can access bookings. Please sign up or wait until your
        membership payment has been proccessed.
      </h4>
      <span className="flex w-full max-w-80 gap-2">
        {!signedIn && <Button onClick={() => goToLogin()}>Log in</Button>}
        <Button onClick={() => goToRegister()}>
          {signedIn ? "Join Now" : "Sign up"}
        </Button>
      </span>
    </div>
  )
}

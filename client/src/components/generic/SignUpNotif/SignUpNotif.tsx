import { useRouter } from "next/navigation"
import Button from "../FigmaButtons/FigmaButton"
import LockIcon from "@/assets/icons/lock.svg"

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
    <div className="bg-gray-1 absolute inset-0 flex h-screen w-full justify-center overflow-hidden bg-opacity-70 px-4 py-2">
      <div className="border-gray-3 mt-12 h-fit rounded-md border-2 bg-white p-5">
        <div className="flex items-center justify-center">
          <LockIcon />
        </div>
        <h2 className="xxs:mb-5 mb-10 mt-5 text-center font-bold text-black">
          Sorry!
        </h2>
        <h4 className="text-center text-black">
          Bookings are only available for UASC members.
        </h4>
        <h4 className="xxs:mb-5 mb-10 mt-1 text-center text-black">
          Please sign up or wait until your membership payment has been
          processed.
        </h4>
        <div className="mb-2 flex justify-center">
          <span className="flex w-full max-w-80 gap-2">
            {!signedIn && <Button onClick={() => goToLogin()}>Log in</Button>}
            <Button onClick={() => goToRegister()}>
              {signedIn ? "Join Now" : "Sign up"}
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}

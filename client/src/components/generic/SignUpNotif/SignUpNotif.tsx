import { useNavigate } from "react-router-dom"
import Button from "../FigmaButtons/FigmaButton"

interface ISignUpNotif {
  signedIn?: boolean
}

export const SignUpNotif = ({ signedIn }: ISignUpNotif) => {
  const navigate = useNavigate()
  function goToRegister() {
    navigate("/register")
  }
  function goToLogin() {
    navigate("/login")
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
          {signedIn ? "Pay for membership" : "Sign up"}
        </Button>
      </span>
    </div>
  )
}

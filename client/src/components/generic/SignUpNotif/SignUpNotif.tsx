import { useNavigate } from "react-router-dom"
import Button from "../FigmaButtons/FigmaButton"

export const SignUpNotif = () => {
  const navigate = useNavigate()
  function nav() {
    navigate("/register")
  }

  return (
    <div className="text-dark-blue-100 flex flex-col items-center justify-center gap-2">
      <h2 className="text-center italic">Currently unavailable</h2>
      <h4 className="max-h-[87px] max-w-[386px] text-center">
        Only paid members can access bookings. Please sign up or wait until your
        membership payment has been proccessed.
      </h4>
      <Button className="" onClick={() => nav()}>
        SIGN UP
      </Button>
    </div>
  )
}
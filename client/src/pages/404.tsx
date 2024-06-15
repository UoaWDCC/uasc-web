import { useNavigate } from "react-router-dom"
import Wind from "assets/icons/wind.svg?react"
import Button from "components/generic/FigmaButtons/FigmaButton"

const NoMatch = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="flex h-screen justify-center ">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Wind className="fill-dark-blue-100" />

        <h2>Error 404</h2>
        <h4>Sorry! Page not found</h4>
        <div className="pt-12">
          <Button
            iconSide="left"
            variant="progress-default"
            onClick={handleBack}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NoMatch

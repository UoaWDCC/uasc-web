// import React from "react"
// import { useNavigate } from "react-router-dom"
import Wind from "assets/logos/Wind.png"
import Button from "components/generic/FigmaButtons/FigmaButton"

const NoMatch = () => {
  const handleBack = () => {
    window.history.go(-1)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={Wind}></img>

      <h2>Error 404</h2>
      <h4>Sorry! Page not found</h4>
      <div className="pt-16">
        <Button iconSide="left" variant="progress-default" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default NoMatch

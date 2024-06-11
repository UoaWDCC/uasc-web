import React from "react"
import { useNavigate } from "react-router-dom"
import Wind from "assets/logos/Wind.png"
import Button from "components/generic/FigmaButtons/FigmaButton"



const InvalidPage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    // window.history.go(-1)
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={Wind}></img>

      <h2>Error 404</h2>
      <h4>Sorry! Page not found</h4>
      <div>
        <Button iconSide="left" variant="progress-default" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default InvalidPage

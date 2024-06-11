import React from "react"
import Wind from "assets/logos/Wind.png"
import Button from "components/generic/FigmaButtons/FigmaButton"

const InvalidPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={Wind}></img>

      <h2>Error 404</h2>
      <h4>Sorry! Page not found</h4>
      <Button iconSide="left">Back</Button>
    </div>
  )
}

export default InvalidPage

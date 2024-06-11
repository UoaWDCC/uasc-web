import React from "react"
import Wind from "assets/logos/Wind.png"
const InvalidPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={Wind}></img>

      <h2>Error 404</h2>
      <h4>Sorry! Page not found</h4>
    </div>
  )
}

export default InvalidPage

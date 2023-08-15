import React from "react"
import logo from "../assets/2023_logo1-768x262-uasc.png"
import { Typography } from "@mui/material"
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser"

const Home = () => {
  const [user, metadata] = useAuthenticatedUser()

  return (
    <>
      <div>
        <img src={logo} alt="uasc-logo-large" />
        <Typography
          variant="h1"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold	",
            color: "white",
          }}
        >
          University of Auckland Snowsports Club
        </Typography>
      </div>
      <div>
        <h1 style={{ fontSize: "300px" }}>
          {user && metadata
            ? `👋, ${user.displayName} ${metadata.email}`
            : "Welcome to UASC!"}
        </h1>
      </div>
    </>
  )
}

export default Home

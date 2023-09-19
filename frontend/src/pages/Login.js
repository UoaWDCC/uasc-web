import React from "react"
import LoginForm from "../components/LoginForm"
import { Typography, Stack, Container, Link } from "@mui/material"

const Login = () => {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 25% 60%, #81c7ebaa, #ffffff)",
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} sx={{ paddingTop: "124px" }}>
          <Typography
            variant="h1"
            align="left"
            color="#474747"
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Typography>
          <LoginForm />
          <Link
            align="left"
            href="/register"
            variant="h4"
            underline="none"
            color="#457CC3"
            sx={{ fontWeight: "900" }}
          >
            Don't have an account? Create one now!
          </Link>
        </Stack>
      </Container>
    </div>
  )
}

export default Login

import React from "react"
import SignUpForm from "../components/SignUpForm"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

const Register = () => {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "150%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 20% 50%, #81c7ebaa, #ffffff)",
      }}
    >
      <Container maxWidth="sm" sx={{ padding: "120px" }}>
        <Box sx={{ textAlign: "center", pt: 3 }}>
          <Typography
            variant="h1"
            align="left"
            color="#474747"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Sign Up
          </Typography>
          <Typography
            variant="h4"
            align="left"
            color="#457CC3"
            sx={{ fontWeight: "900", marginBottom: "24px" }}
          >
            Create an account to get access to the lodge and more!
          </Typography>
        </Box>
        <SignUpForm />
      </Container>
    </div>
  )
}

export default Register

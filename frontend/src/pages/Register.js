import React from "react"
import SignUpForm from "../components/SignUpForm"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

const Register = () => {
  return (
    <div className="bg-gray-200">
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", pt: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Sign Up
          </Typography>
        </Box>
        <SignUpForm />
      </Container>
    </div>
  )
}

export default Register

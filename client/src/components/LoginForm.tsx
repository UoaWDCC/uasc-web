import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Alert, Button, TextField, Typography, Stack } from "@mui/material"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginSuccessful, setLoginSuccessful] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Removed userCredential for now. Will add back later when needed.
        setLoginSuccessful(true)
        // The user is successfully signed in
        setTimeout(() => {
          setLoginSuccessful(false)
          navigate("/profile")
        }, 2000)
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setLoginErrorMessage("Incorrect email address")
            setTimeout(() => {
              setLoginErrorMessage("")
            }, 2000)
            break
          case "auth/wrong-password":
            setLoginErrorMessage("Incorrect password")
            setTimeout(() => {
              setLoginErrorMessage("")
            }, 2000)
            break
          case "auth/user-not-found":
            setLoginErrorMessage(
              "Email does not have an account associated with it"
            )
            setTimeout(() => {
              setLoginErrorMessage("")
            }, 2000)
            break
          default:
            setLoginErrorMessage("An error occurred")
            setTimeout(() => {
              setLoginErrorMessage("")
            }, 2000)
            break
        }
      })
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)"
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack sx={{ marginBottom: "24px" }}>
          <Typography
            variant="h5"
            align="left"
            color="black"
            sx={{ fontWeight: "700" }}
          >
            Email:
          </Typography>

          <TextField
            variant="standard"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              disableUnderline: true
            }}
            style={{
              width: "100%",
              background: "#EDF8FF",
              // @ts-ignore
              "&:hover": {
                // @ts-ignore
                borderColor: "transparent"
              },
              borderRadius: "5px"
            }}
          />
        </Stack>
        <Stack sx={{ marginBottom: "24px" }}>
          <Typography
            variant="h5"
            align="left"
            color="black"
            sx={{ fontWeight: "700" }}
          >
            Password:
          </Typography>
          <TextField
            variant="standard"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              disableUnderline: true
            }}
            style={{
              width: "100%",
              background: "#EDF8FF",
              // @ts-ignore
              "&:hover": {
                borderColor: "transparent"
              },
              borderRadius: "5px"
            }}
          />
        </Stack>
        <Button
          type="submit"
          disabled={loginSuccessful}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            borderRadius: "100px",
            paddingX: "24px",
            textTransform: "none"
          }}
        >
          SUBMIT
        </Button>
        {loginSuccessful ? (
          <Alert severity="success" sx={{ marginTop: "1vh" }}>
            Login Successful!
          </Alert>
        ) : null}
        {loginErrorMessage !== "" ? (
          <Alert severity="error" sx={{ marginTop: "1vh" }}>
            {loginErrorMessage}
          </Alert>
        ) : null}
      </form>
    </div>
  )
}

export default LoginForm

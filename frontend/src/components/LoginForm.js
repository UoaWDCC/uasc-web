import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Alert, Button, FormControl, FormLabel, TextField } from "@mui/material"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginSuccessful, setLoginSuccessful] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //Removed userCredential for now. Will add back later when needed.
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
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel style={{ textAlign: "left" }}>Email</FormLabel>
        <TextField
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></TextField>
        <FormLabel style={{ textAlign: "left" }}>Password</FormLabel>
        <TextField
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          disabled={loginSuccessful}
          sx={{ marginTop: "1vh" }}
        >
          Submit
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
      </FormControl>
    </form>
  )
}

export default LoginForm

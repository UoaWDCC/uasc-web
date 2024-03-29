import React, { useState } from "react"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { db } from "../../../firebase"
import { setDoc, doc } from "firebase/firestore"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
    dob: "",
    studentId: "",
    yearLevel: "",
    faculty: "",
    sportType: "",
    interestedInRacing: ""
  })

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    password: false,
    confirmPassword: false,
    email: false,
    confirmEmail: false,
    phoneNumber: false,
    dob: false,
    studentId: false,
    yearLevel: false,
    faculty: false,
    sportType: false,
    interestedInRacing: false
  })

  const [open, setOpen] = useState(false)

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  const auth = getAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      confirmEmail,
      phoneNumber,
      dob,
      studentId,
      yearLevel,
      faculty,
      sportType,
      interestedInRacing
    } = formState

    const newErrors = {
      firstName: !firstName,
      lastName: !lastName,
      password: !password,
      confirmPassword: confirmPassword !== password,
      email: !email,
      confirmEmail: email !== confirmEmail,
      phoneNumber: !phoneNumber,
      dob: !dob,
      studentId: !studentId,
      yearLevel: !yearLevel,
      faculty: !faculty,
      sportType: !sportType,
      interestedInRacing: !interestedInRacing
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log("User created")

      await updateProfile(user, { displayName: `${firstName} ${lastName}` })
      console.log("Profile updated")

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        dob,
        studentId,
        yearLevel,
        faculty,
        sportType,
        interestedInRacing
      })
      console.log("Document set in Firestore")

      setOpen(true)
      setTimeout(() => {
        navigate("/") // Replace '/' with the URL of your homepage
      }, 5000)
      console.log("Navigate called")
    } catch (error: any) {
      console.error("Error creating user:", error)
      alert(error.message)
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const textFieldStyle = {
    marginBottom: "12px",
    width: "100%"
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
        <div style={textFieldStyle}>
          <Stack direction="row" spacing={2}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              required
              onChange={handleChange}
              error={errors.firstName}
              helperText={errors.firstName ? "First name is required" : ""}
              style={textFieldStyle}
              size="small"
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              required
              onChange={handleChange}
              error={errors.lastName}
              helperText={errors.lastName ? "Last name is required" : ""}
              size="small"
              style={textFieldStyle}
            />
          </Stack>
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            required
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            required
            onChange={handleChange}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword ? "Passwords do not match" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            type="email"
            required
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="confirmEmail"
            name="confirmEmail"
            label="Confirm Email Address"
            variant="outlined"
            type="email"
            required
            onChange={handleChange}
            error={errors.confirmEmail}
            helperText={
              errors.confirmEmail ? "Email addresses do not match" : ""
            }
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            required
            onChange={handleChange}
            error={errors.phoneNumber}
            helperText={errors.phoneNumber ? "Phone number is required" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="dob"
            name="dob"
            label="Date of Birth"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            required
            onChange={handleChange}
            error={errors.dob}
            helperText={errors.dob ? "Date of birth is required" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="studentId"
            name="studentId"
            label="UoA Student ID (Enter 0 if not you're not a UoA Student)"
            variant="outlined"
            required
            onChange={handleChange}
            error={errors.studentId}
            helperText={
              errors.studentId
                ? "UoA Student ID is required (Enter 0 if not a UoA student)"
                : ""
            }
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="yearLevel"
            name="yearLevel"
            label="What year level are you in?"
            variant="outlined"
            required
            onChange={handleChange}
            error={errors.yearLevel}
            helperText={errors.yearLevel ? "Year level is required" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="faculty"
            name="faculty"
            label="What faculty are you in?"
            variant="outlined"
            required
            onChange={handleChange}
            error={errors.faculty}
            helperText={errors.faculty ? "Faculty is required" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="sportType"
            name="sportType"
            label="Are you a Skier/Boarder/Both or New to the sport?"
            variant="outlined"
            required
            onChange={handleChange}
            error={errors.sportType}
            helperText={errors.sportType ? "This information is required" : ""}
            size="small"
            style={textFieldStyle}
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            id="interestedInRacing"
            name="interestedInRacing"
            label="Would you be interested in racing?"
            variant="outlined"
            required
            onChange={handleChange}
            error={errors.interestedInRacing}
            helperText={
              errors.interestedInRacing ? "This information is required" : ""
            }
            size="small"
            style={textFieldStyle}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            borderRadius: "100px",
            paddingX: "24px",
            textTransform: "none",
            width: "fit-content"
          }}
          type="submit"
        >
          SUBMIT
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You have signed up successfully! Please wait to be redirected to the
          home page!
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You've successfully signed up!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SignUpForm

import React from "react"
import { Button, FormControl, FormLabel, TextField } from "@mui/material"

const ContactForm = () => {
  const handleSubmit = () => {
    console.log("Form submitted")
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel style={{ textAlign: "left" }}>Name</FormLabel>
        <TextField required></TextField>
        <FormLabel style={{ textAlign: "left" }}>Email Address</FormLabel>
        <TextField required></TextField>
        <FormLabel style={{ textAlign: "left" }}>Message</FormLabel>
        <TextField multiline required></TextField>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormControl>
    </form>
  )
}

;<style></style>

export default ContactForm

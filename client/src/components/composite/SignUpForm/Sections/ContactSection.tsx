import { TextField } from "@mui/material"

export const ContactSection = () => {
  return (
    <div>
      <TextField
        id="email"
        name="email"
        label="Email Address"
        variant="outlined"
        type="email"
        required
        size="small"
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        required
        size="small"
      />
      <TextField
        id="emergencyContact"
        name="emergencyContact"
        label="Emergency contact details"
        variant="outlined"
        required
        size="small"
      />
    </div>
  )
}

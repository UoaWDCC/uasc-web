import { MenuItem, Select, TextField } from "@mui/material"
import { Stack } from "@mui/system"

export const PersonalSectionFirst = () => {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
          required
          size="small"
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          required
          size="small"
        />
      </Stack>

      <Select
        id="gender"
        name="gender"
        label="Gender"
        variant="outlined"
        required
        size="small"
      >
        <MenuItem value={"Male"}>Male</MenuItem>
        <MenuItem value={"Female"}>Female</MenuItem>
        <MenuItem value={"N/A"}>Prefer not to say</MenuItem>
      </Select>
    </div>
  )
}

export const PersonalSectionSecond = () => {
  return (
    <div>
      <TextField
        id="studentId"
        name="studentId"
        label="UoA Student ID (Enter 0 if not you're not a UoA Student)"
        variant="outlined"
        required
        size="small"
      />
      <Select
        id="yearLevel"
        name="yearLevel"
        label="What year level are you in?"
        variant="outlined"
        required
        size="small"
      >
        <MenuItem value={0}>Non-Student</MenuItem>
        <MenuItem value={1}>1st year</MenuItem>
        <MenuItem value={2}>2nd year</MenuItem>
        <MenuItem value={3}>3rd year</MenuItem>
        <MenuItem value={4}>4th year</MenuItem>
        <MenuItem value={5}>5th year</MenuItem>
        <MenuItem value={7}>other</MenuItem>
        <MenuItem value={6}>grad</MenuItem>
        <MenuItem value={7}>international exchange</MenuItem>
      </Select>
      <Select
        id="faculty"
        name="faculty"
        label="What faculty are you in?"
        variant="outlined"
        required
        size="small"
      >
        <MenuItem value={0}>Engineering</MenuItem>
        <MenuItem value={1}>Med/Health Sci</MenuItem>
        <MenuItem value={2}>Science</MenuItem>
        <MenuItem value={3}>Commerce</MenuItem>
        <MenuItem value={4}>Arts</MenuItem>
        <MenuItem value={5}>Law</MenuItem>
        <MenuItem value={7}>Education/Social Work</MenuItem>
        <MenuItem value={6}>Creative Arts & Industries</MenuItem>
        <MenuItem value={7}>Non-Student</MenuItem>
        <MenuItem value={7}>Other</MenuItem>
      </Select>
    </div>
  )
}

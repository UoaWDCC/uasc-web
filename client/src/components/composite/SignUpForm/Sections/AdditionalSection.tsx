import { MenuItem, Select, TextField } from "@mui/material"

export const AdditionalSection = () => {
  return (
    <div>
      <Select
        id="sportType"
        name="sportType"
        label="Are you a Skier/Boarder/Both or New to the sport?"
        variant="outlined"
        required
        size="small"
      >
        <MenuItem value={1}>Skier</MenuItem>
        <MenuItem value={2}>Snowboarder</MenuItem>
        <MenuItem value={3}>Both</MenuItem>
        <MenuItem value={4}>New to both</MenuItem>
      </Select>

      <Select
        id="interestedInRacing"
        name="interestedInRacing"
        label="Would you be interested in racing?"
        variant="outlined"
        required
        size="small"
      >
        <MenuItem value={1}>Yes</MenuItem>
        <MenuItem value={2}>No</MenuItem>
        <MenuItem value={3}>Maybe</MenuItem>
      </Select>

      <TextField
        id="dietaryRequirements"
        name="dietaryRequirements"
        label="Dietary Requirements"
        variant="outlined"
        required
        size="small"
      />
    </div>
  )
}

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"

const SignUpForm = () => (
  <div
    style={{
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)"
    }}
  >
    <form>
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
      </div>
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
      </div>
      <div>
        <TextField
          id="confirmEmail"
          name="confirmEmail"
          label="Confirm Email Address"
          variant="outlined"
          type="email"
          required
          size="small"
        />
      </div>
      <div>
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          required
          size="small"
        />
      </div>
      <div>
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
          size="small"
        />
      </div>
      <div>
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

      <div>
        <TextField
          id="studentId"
          name="studentId"
          label="UoA Student ID (Enter 0 if not you're not a UoA Student)"
          variant="outlined"
          required
          size="small"
        />
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <TextField
          id="emergencyContact"
          name="emergencyContact"
          label="Emergency contact details"
          variant="outlined"
          required
          size="small"
        />
      </div>
      <div>
        <TextField
          id="dietaryRequirements"
          name="dietaryRequirements"
          label="Dietary Requirements"
          variant="outlined"
          required
          size="small"
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
  </div>
)

export default SignUpForm

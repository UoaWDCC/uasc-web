import { MenuItem, Select, TextField } from "@mui/material"
import { useSignUpFormData } from "store/signupform"
import Radio from "components/generic/Radio/Radio"
import TextInput from "components/generic/TextInputComponent/TextInput"
// import { Timestamp } from "firebase-admin/firestore"

export const PersonalSectionFirst = () => {
  const [{ first_name, last_name, date_of_birth }, { updateFormData }] =
    useSignUpFormData()

  return (
    <div className="max-w-sm">
      <span className="mb-3 flex gap-5">
        <TextInput
          type="text"
          label="First Name"
          id="FirstName"
          value={first_name}
          onChange={(e) => updateFormData({ first_name: e.target.value })}
          required
        />
        <TextInput
          type="text"
          label="Last Name"
          description="Last name input here"
          id="LastName"
          value={last_name}
          onChange={(e) => updateFormData({ last_name: e.target.value })}
          required
        />
      </span>
      <TextInput
        type="date"
        label="Birthday"
        id="Birthday"
        // value={
        //   date_of_birth &&
        //   new Timestamp(date_of_birth.seconds, date_of_birth.nanoseconds)
        //     .toDate()
        //     .toISOString()
        // }
        // onChange={(e) =>
        //   updateFormData({
        //     date_of_birth: {
        //       seconds: Timestamp.fromDate(new Date(e.target.value)).seconds,
        //       nanoseconds: Timestamp.fromDate(new Date(e.target.value))
        //         .nanoseconds
        //     }
        //   })
        // }
        required
      />

      <p className="mb-2 mt-5">Gender</p>
      <Radio onChange={(e) => updateFormData({ gender: e.target?.value })}>
        Male
      </Radio>
      <Radio onChange={(e) => updateFormData({ gender: e.target?.value })}>
        Female
      </Radio>
      <Radio onChange={(e) => updateFormData({ gender: e.target?.value })}>
        Other
      </Radio>
      <Radio onChange={(e) => updateFormData({ gender: e.target?.value })}>
        Prefer not to say
      </Radio>
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

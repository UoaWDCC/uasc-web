import { useSignUpFormData } from "@/store/SignUpForm"
import Radio from "@/components/generic/Radio/Radio"
import TextInput from "@/components/generic/TextInputComponent/TextInput"
import { Timestamp } from "firebase/firestore"
import Dropdown from "@/components/generic/Dropdown/Dropdown"

export const PersonalSectionFirst = () => {
  const [{ first_name, last_name, date_of_birth, gender }, { updateFormData }] =
    useSignUpFormData()

  return (
    <div className="max-w-sm">
      <span className="mb-3 flex gap-5">
        <TextInput
          type="text"
          label="First Name"
          id="FirstName"
          defaultValue={first_name}
          onChange={(e) => updateFormData({ first_name: e.target.value })}
          required
        />
        <TextInput
          type="text"
          label="Last Name"
          id="LastName"
          defaultValue={last_name}
          onChange={(e) => updateFormData({ last_name: e.target.value })}
          required
        />
      </span>
      <TextInput
        type="date"
        label="Birthday"
        id="Birthday"
        defaultValue={
          date_of_birth &&
          new Timestamp(date_of_birth.seconds, date_of_birth.nanoseconds)
            .toDate()
            .toISOString()
            .split("T")[0]
        }
        min={new Date(0).toISOString().split("T")[0]} // 1970
        max={new Date().toISOString().split("T")[0]} // Today
        onChange={(e) => {
          const value = e.target.valueAsDate
          if (value) {
            updateFormData({
              date_of_birth: {
                seconds: Timestamp.fromDate(new Date(e.target.value)).seconds,
                nanoseconds: Timestamp.fromDate(new Date(e.target.value))
                  .nanoseconds
              }
            })
          }
        }}
        required
      />

      <p className="mb-2 mt-5">Gender - Optional</p>
      <div className="mb-3 flex max-w-sm flex-col gap-2">
        <Radio
          value="Male"
          checked={gender === "Male"}
          onChange={(e) => updateFormData({ gender: e.target?.value })}
        >
          Male
        </Radio>
        <Radio
          value="Female"
          checked={gender === "Female"}
          onChange={(e) => updateFormData({ gender: e.target?.value })}
        >
          Female
        </Radio>
        <Radio
          value="Other"
          checked={gender === "Other"}
          onChange={(e) => updateFormData({ gender: e.target?.value })}
        >
          Other
        </Radio>
        <Radio
          value="Prefer not to say"
          checked={gender === "Prefer not to say"}
          onChange={(e) => updateFormData({ gender: e.target?.value })}
        >
          Prefer not to say
        </Radio>
      </div>

      <TextInput
        type="text"
        onChange={(e) => updateFormData({ ethnicity: e.target.value })}
        label="Ethnicity - Optional"
      />
    </div>
  )
}

export const PersonalSectionSecond = () => {
  const [{ student_id, university_year, faculty }, { updateFormData }] =
    useSignUpFormData()

  return (
    <div className="flex max-w-sm flex-col gap-5">
      <TextInput
        type="text"
        label="UoA UPI"
        description="Put NA if not a UoA Student"
        id="FirstName"
        defaultValue={student_id}
        placeholder="e.g. jdoe696"
        onChange={(e) => updateFormData({ student_id: e.target.value })}
        required
      />
      <Dropdown
        value={university_year}
        label="What year are you at uni?"
        onChange={(e) => updateFormData({ university_year: e.target?.value })}
      >
        <option value="" disabled>
          Select...
        </option>
        <option key="Non-Student" value="Non-Student">
          Non-Student
        </option>
        <option key="1st year" value="1st year">
          1st Year
        </option>
        <option key="2nd Year" value="2nd Year">
          2nd Year
        </option>
        <option key="3rd Year" value="3rd Year">
          3rd Year
        </option>
        <option key="4th Year" value="4th Year">
          4th Year
        </option>
        <option key="5th Year" value="5th Year">
          5th Year
        </option>
        <option key="Other" value="Other">
          Other
        </option>
        <option key="Grad" value="Grad">
          Grad
        </option>
        <option key="International Exchange" value="International Exchange">
          International Exchange
        </option>
      </Dropdown>
      <Dropdown
        value={faculty}
        label="What faculty?"
        onChange={(e) => updateFormData({ faculty: e.target?.value })}
      >
        <option value="" disabled>
          Select...
        </option>
        <option key="Engineering" value="Engineering">
          Engineering
        </option>
        <option key="Med/Health Sci" value="Med/Health Sci">
          Med/Health Sci
        </option>
        <option key="Science" value="Science">
          Science
        </option>
        <option key="Commerce" value="Commerce">
          Commerce
        </option>
        <option key="Arts" value="Arts">
          Arts
        </option>
        <option key="Law" value="Law">
          Law
        </option>
        <option key="Education/Social Work" value="Education/Social Work">
          Education/Social Work
        </option>
        <option
          key="Creative Arts & Industries"
          value="Creative Arts & Industries"
        >
          Creative Arts & Industries
        </option>
        <option key="Non-Student" value="Non-Student">
          Non-Student
        </option>
        <option key="Other" value="Other">
          Other
        </option>
      </Dropdown>
    </div>
  )
}

import { useSignUpFormData } from "store/signupform"
import Radio from "components/generic/Radio/Radio"
import TextInput from "components/generic/TextInputComponent/TextInput"
// import { Timestamp } from "firebase-admin/firestore"
import Dropdown from "components/generic/Dropdown/Dropdown"

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
  const [{ student_id, university_year, faculty }, { updateFormData }] =
    useSignUpFormData()

  return (
    <div className="flex max-w-sm flex-col gap-5">
      <TextInput
        type="text"
        label="UoA Student ID Number"
        description="Put NA if not a UoA Student"
        id="FirstName"
        value={student_id}
        onChange={(e) => updateFormData({ student_id: e.target.value })}
        required
      />
      <Dropdown
        value={university_year}
        label="What year are you at uni?"
        onChange={(e) => updateFormData({ university_year: e.target?.value })}
      >
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

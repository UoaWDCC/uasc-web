import { useSignUpFormData } from "store/SignUpForm"
import Radio from "components/generic/Radio/Radio"
import TextInput from "components/generic/TextInputComponent/TextInput"
import { Timestamp } from "firebase/firestore"

export const ConfirmDetailsSection = () => {
  const [{ first_name, last_name, date_of_birth, gender }, { updateFormData }] =
    useSignUpFormData()

  const full_name = `${first_name} ${last_name}`

  return (
    <div className="max-w-sm">
      <span className="mb-3 flex gap-5">
        <TextInput
          type="text"
          label="Name"
          id="Name"
          defaultValue={full_name}
          required
        />
      </span>
      <TextInput
        type="text"
        label="Gender"
        id="Gender"
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

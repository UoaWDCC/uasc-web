import { useSignUpFormData } from "store/signupform"
import TextInput from "components/generic/TextInputComponent/TextInput"

export const ContactSection = () => {
  const [
    { emergency_name, emergency_relation, emergency_phone },
    { updateFormData }
  ] = useSignUpFormData()

  const parseEmergencyContactInfo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const contactInfo: string[] = e.target.value.split(", ")
    contactInfo[0] && updateFormData({ emergency_name: contactInfo[0] })
    contactInfo[1] && updateFormData({ emergency_relation: contactInfo[1] })
    contactInfo[2] && updateFormData({ emergency_phone: contactInfo[2] })
  }

  return (
    <div className="flex max-w-sm flex-col gap-5">
      <TextInput
        type="email"
        label="Email"
        id="Email"
        placeholder="email@domain.com"
        required
      />
      <TextInput
        type="tel"
        label="Mobile Number"
        id="MobileNumber"
        placeholder="000 000 0000"
        required
      />
      <TextInput
        type="text"
        label="Emergency contact info"
        description="Name, relationship to you, their mobile number"
        id="EmergencyContactInfo"
        value={`${emergency_name}, ${emergency_relation}, ${emergency_phone}`}
        onChange={parseEmergencyContactInfo}
        required
      />
    </div>
  )
}

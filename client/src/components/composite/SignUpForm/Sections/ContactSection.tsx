import { useSignUpFormData } from "store/SignUpForm"
import TextInput from "components/generic/TextInputComponent/TextInput"

export const ContactSection = () => {
  const [{ emergency_contact, email, confirmEmail }, { updateFormData }] = useSignUpFormData()

  return (
    <div className="flex max-w-sm flex-col gap-5">
      <TextInput
        type="email"
        label="Email"
        id="Email"
        defaultValue={email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        placeholder="email@domain.com"
        required
      />
      <TextInput
        type="email"
        label="Confirm Email"
        id="Email"
        defaultValue={confirmEmail}
        onChange={(e) => updateFormData({ confirmEmail: e.target.value })}
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
        defaultValue={emergency_contact}
        onChange={(e) => {
          updateFormData({ emergency_contact: e.target.value })
        }}
        required
      />
    </div>
  )
}

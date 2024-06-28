import { useSignUpFormData } from "store/SignUpForm"
import ConfirmDetailsForm from "components/generic/ConfirmDetailsForm/ConfirmDetailsForm"

export const ConfirmDetailsSection = () => {
  const [{ first_name, last_name }] = useSignUpFormData()

  const full_name = `${first_name} ${last_name}`

  return (
    <div className="max-w-sm">
      <span className="mb-3 flex gap-5">
        <ConfirmDetailsForm>
          <p className="mb-2 mt-5">Personal Details</p>
          <p className="mb-2 mt-5 opacity-70">Name</p>
          <p>{full_name}</p>
          <p className="mb-2 mt-5" style={{ opacity: 0.7 }}>
            DOB
          </p>
          <p className="mb-2 mt-5" style={{ opacity: 0.7 }}>
            Gender
          </p>
          <p className="mb-2 mt-5" style={{ opacity: 0.7 }}>
            Student ID Number
          </p>
          <p className="mb-2 mt-5" style={{ opacity: 0.7 }}>
            University Year
          </p>
          <p className="mb-2 mt-5" style={{ opacity: 0.7 }}>
            Faculty
          </p>
        </ConfirmDetailsForm>
      </span>
    </div>
  )
}

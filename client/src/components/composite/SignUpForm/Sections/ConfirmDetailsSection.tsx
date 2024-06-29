import { useSignUpFormData } from "store/SignUpForm"
import ConfirmDetailsForm from "components/generic/ConfirmDetailsForm/ConfirmDetailsForm"

const MyText = ({ text = "N/A" }: { text?: string }) => {
  return <p className="mb-2">{text}</p>
}

const Field = ({ text }: { text: string }) => {
  return (
    <p
      className="font-family: Inter; mb-2 mt-5 opacity-70"
      style={{ color: "var(--Greys-60, #BDBDBD) " }}
    >
      {text}
    </p>
  )
}

const Title = ({ text }: { text: string }) => {
  return (
    <p
      style={{
        color: "var(--Dark-Blues-100, #283D87)",
        fontFeatureSettings: "'clig' off, 'liga' off",
        marginTop: "20px",
        fontFamily: "Inter",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 700,
        textTransform: "uppercase"
      }}
    >
      {text}
    </p>
  )
}

export const ConfirmDetailsSection = () => {
  const [
    {
      first_name,
      last_name,
      date_of_birth,
      gender,
      student_id,
      university_year,
      faculty
    }
  ] = useSignUpFormData()

  const full_name = `${first_name} ${last_name}`

  return (
    <div className="max-w-sm">
      <span className="mb-3 flex gap-5">
        <ConfirmDetailsForm>
          <Title text="Personal Details" />
          <Field text="Name" />
          <MyText text={full_name} />
          <Field text="DOB" />
          <MyText text={date_of_birth.seconds.toString()} />
          <Field text="Gender" />
          <MyText text={gender} />
          <Field text="Student ID Number" />
          <MyText text={student_id} />
          <Field text="University Year" />
          <MyText text={university_year} />
          <Field text="Faculty" />
          <MyText text={faculty} />
        </ConfirmDetailsForm>
      </span>
    </div>
  )
}

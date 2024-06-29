import { useSignUpFormData } from "store/SignUpForm"
import ConfirmDetailsForm from "components/generic/ConfirmDetailsForm/ConfirmDetailsForm"

const MyText = ({ text = "N/A" }: { text?: string }) => {
  return <p className="mb-5">{text}</p>
}

const Field = ({ text }: { text: string }) => {
  return (
    <p className="font-family: Inter; mb-2 mt-5 text-gray-400 opacity-70">
      {text}
    </p>
  )
}

const Title = ({ text }: { text: string }) => {
  return (
    <p className="font-family: Inter; mt-5 text-sm font-bold uppercase not-italic text-blue-800">
      {text}
    </p>
  )
}

const SectionSeparator = () => {
  return <hr className="h-px w-4/5 border-gray-400" />
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
      faculty,
      email,
      phone_number,
      emergency_contact,
      does_ski,
      does_snowboarding,
      does_racing,
      dietary_requirements
    }
  ] = useSignUpFormData()

  const full_name = `${first_name} ${last_name}`

  const formatDateOfBirth = (
    timestamp: { seconds: number; nanoseconds: number } | undefined
  ) => {
    if (!timestamp) return "N/A"

    const dob = new Date(timestamp.seconds * 1000)

    const day = dob.getDate().toString().padStart(2, "0")
    const month = (dob.getMonth() + 1).toString().padStart(2, "0")
    const year = dob.getFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <div>
      <p className="font-family: Inter; mb-4 text-base leading-5 text-black">
        Please review member details before proceeding to payment
      </p>

      <span className="mb-3 flex gap-5">
        <ConfirmDetailsForm>
          <Title text="Personal Details" />
          <Field text="Name" />
          <MyText text={full_name} />
          <Field text="DOB" />
          <MyText text={formatDateOfBirth(date_of_birth)} />
          <Field text="Gender" />
          {gender ? <MyText text={gender} /> : <MyText text="N/A" />}{" "}
          <Field text="Student ID Number" />
          <MyText text={student_id} />
          <Field text="University Year" />
          {university_year ? (
            <MyText text={university_year} />
          ) : (
            <MyText text="N/A" />
          )}{" "}
          <Field text="Faculty" />
          <MyText text={faculty} />
          <SectionSeparator />
          <Title text="Contact Information" />
          <Field text="Email" />
          <MyText text={email} />
          <Field text="Mobile Number" />
          <MyText text={phone_number.toString()} />
          <Field text="Emergency Contact" />
          {emergency_contact ? (
            <MyText text={emergency_contact} />
          ) : (
            <MyText text="N/A" />
          )}{" "}
          <SectionSeparator />
          <Title text="Additional Information" />
          <Field text="Skier/Snowboarder?" />
          <MyText
            text={
              does_ski && does_snowboarding
                ? "Both"
                : does_snowboarding
                  ? "Snowboarder"
                  : "Skier"
            }
          />{" "}
          <Field text="Keen on Racing?" />
          <MyText text={does_racing ? "Yes" : "No"} />
          <Field text="Dietary Requirements" />
          {dietary_requirements ? (
            <MyText text={dietary_requirements} />
          ) : (
            <MyText text="N/A" />
          )}{" "}
        </ConfirmDetailsForm>
      </span>
    </div>
  )
}

import { dateToFirestoreTimeStamp } from "data-layer/adapters/DateUtils"
import { UserAdditionalInfo } from "data-layer/models/firebase"

export const userInfoMock: UserAdditionalInfo = {
  date_of_birth: dateToFirestoreTimeStamp(new Date(10000000000)),
  phone_number: 69696969,
  does_snowboarding: true,
  does_racing: true,
  does_ski: false,
  gender: "non-binary",
  emergency_contact: "string",
  first_name: "first",
  last_name: "second",
  dietary_requirements: "nothing",
  faculty: "engineering",
  university: "uoa",
  student_id: "11299211",
  university_year: "2nd",
  stripe_id: "default"
}
export const userInfoMock2: UserAdditionalInfo = {
  date_of_birth: dateToFirestoreTimeStamp(new Date(1000000000)),
  phone_number: 69696969,
  does_snowboarding: true,
  does_racing: true,
  does_ski: false,
  gender: "non-ternary",
  emergency_contact: "string",
  first_name: "third",
  last_name: "fourth",
  dietary_requirements: "halal",
  faculty: "science",
  university: "uoa",
  student_id: "125366427",
  university_year: "3rd"
}

export const signupUserMock: UserAdditionalInfo = {
  date_of_birth: dateToFirestoreTimeStamp(new Date(0)),
  phone_number: 69696969,
  does_snowboarding: true,
  does_racing: true,
  does_ski: true,
  gender: "string",
  emergency_contact: "string",
  first_name: "string",
  last_name: "string",
  dietary_requirements: "string",
  faculty: "string",
  university: "string",
  student_id: "string",
  university_year: "string"
}

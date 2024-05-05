import { dateToFirestoreTimeStamp } from "data-layer/adapters/FirestoreUtils"
import { UserAdditionalInfo } from "data-layer/models/firebase"

export const userInfoMock: UserAdditionalInfo = {
  date_of_birth: dateToFirestoreTimeStamp(new Date(10000000000)),
  does_freestyle: true,
  does_racing: true,
  does_ski: false,
  gender: "non-binary",
  emergency_name: "emergency",
  emergency_phone: "111",
  emergency_relation: "relation",
  first_name: "first",
  last_name: "second",
  dietary_requirements: "nothing",
  faculty: "engineering",
  university: "uoa",
  student_id: "11299211",
  returning: true,
  university_year: "2nd",
  stripe_id: "default"
}
export const userInfoMock2: UserAdditionalInfo = {
  date_of_birth: dateToFirestoreTimeStamp(new Date(1000000000)),
  does_freestyle: true,
  does_racing: true,
  does_ski: false,
  gender: "non-ternary",
  emergency_name: "emergency",
  emergency_phone: "111",
  emergency_relation: "relation",
  first_name: "third",
  last_name: "fourth",
  dietary_requirements: "halal",
  faculty: "science",
  university: "uoa",
  student_id: "125366427",
  returning: true,
  university_year: "3rd"
}

export const signupUserMock: UserAdditionalInfo = {
  date_of_birth: dateToFirestoreTimeStamp(new Date(0)),
  does_freestyle: true,
  does_racing: true,
  does_ski: true,
  gender: "string",
  emergency_name: "string",
  emergency_phone: "string",
  emergency_relation: "string",
  first_name: "string",
  last_name: "string",
  dietary_requirements: "string",
  faculty: "string",
  university: "string",
  student_id: "string",
  returning: true,
  university_year: "string"
}

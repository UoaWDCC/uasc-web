import { dateToFirestoreTimeStamp } from "data-layer/adapters/FirestoreUtils"
import { UserAdditionalInfo } from "data-layer/models/firebase"

export const memberUserInfoMock: UserAdditionalInfo = {
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
  membership: "member",
  dietary_requirements: "nothing",
  faculty: "engineering",
  university: "uoa",
  student_id: "11299211",
  returning: true,
  university_year: "2nd"
}

export const adminUserInfoMock: UserAdditionalInfo = {
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
  membership: "admin",
  dietary_requirements: "halal",
  faculty: "science",
  university: "uoa",
  student_id: "125366427",
  returning: true,
  university_year: "3rd"
}

export const guestUserInfoMock: UserAdditionalInfo = {
  date_of_birth: dateToFirestoreTimeStamp(new Date(1000000000)),
  does_freestyle: true,
  does_racing: true,
  does_ski: false,
  gender: "non-ternary",
  emergency_name: "emergency",
  emergency_phone: "111",
  emergency_relation: "relation",
  first_name: "fifth",
  last_name: "sixth",
  membership: "guest",
  dietary_requirements: "nothing",
  faculty: "science",
  university: "uoa",
  student_id: "125366433",
  returning: true,
  university_year: "1st"
}

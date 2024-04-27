import { CommonResponse } from "./CommonResponse"

export interface UserSignupResponse extends CommonResponse {
  jwtToken: string
  uid: string
}

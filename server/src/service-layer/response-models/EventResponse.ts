import { CommonResponse } from "./CommonResponse"

export interface EventSignupResponse extends CommonResponse {
  data?: {
    first_name: string
    last_name: string
    email: string
  }
}

"use client"

import {
  useCheckRegisterPermissions,
  useCurrentStep
} from "@/components/composite/SignUpForm/utils/Utils"

const Register = () => {
  const currentPage = useCurrentStep()
  useCheckRegisterPermissions(currentPage)
  return null
}

export default Register

"use client"

import {
  PAGE_CONTENT,
  PAGINATED_FORM_PAGES
} from "@/components/composite/SignUpForm/PageConfig/PageConfig"
import { ProtectedSignUpForm } from "@/components/composite/SignUpForm/SignUpForm"
import { fireAnalytics } from "@/firebase"
import { useSignUpUserMutation } from "@/services/User/UserMutations"
import { useSignUpFormData } from "@/store/SignUpForm"
import { useAppData } from "@/store/Store"
import { useRouter } from "next/navigation"
import { oneLevelUp } from "@/components/composite/SignUpForm/utils/Utils"

export default function RegisterInner({ step }: { step: string }) {
  const navigateFn = useRouter()
  const [signUpFormData, { validateForm, resetForm }] = useSignUpFormData()
  const [{ currentUser }] = useAppData()
  const { email, confirmEmail, formValidity, ...user } = signUpFormData

  const { mutate, isPending, error, data } = useSignUpUserMutation()

  const successfullySignedUp = !!data?.jwtToken

  // If user is logged in we don't care abotu the form alerts
  const formAlerts = currentUser
    ? undefined
    : {
        errorMessage: error?.message || formValidity?.errorMessage,
        message: data?.error || data?.message,
        successMessage: successfullySignedUp
          ? "Account Created! Signing in"
          : undefined
      }

  const signUpHandler = () => {
    fireAnalytics("sign_up")
    mutate(
      {
        email: email === confirmEmail ? email : "",
        user
      },
      {
        onSuccess() {
          resetForm()
        },
        onError(error) {
          console.error("Error signing up " + error)
        }
      }
    )
  }

  const pages = PAGINATED_FORM_PAGES(
    (name) => {
      if (name === -1) {
        navigateFn.back()
        return
      }

      if (name === "/profile") {
        navigateFn.replace("/profile")
        return
      }

      navigateFn.push(oneLevelUp(name as string))
    },
    signUpHandler,
    validateForm,
    isPending || successfullySignedUp,
    !!currentUser
  )
  const pageContent = PAGE_CONTENT
  return (
    <ProtectedSignUpForm
      step={step}
      pageContent={pageContent}
      pages={pages}
      alerts={formAlerts}
    />
  )
}

import { updatePassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { createRef } from "react"
import Button from "@/components/generic/FigmaButtons/FigmaButton"

import {
  type HandlerResponse,
  PasswordSetupForm
} from "@/components/generic/PasswordSetupForm/PasswordSetupForm"
import { useAppData } from "@/store/Store"
import { SUCCESS_ROUTE } from "../utils/RouteNames"
import { oneLevelUp } from "../utils/Utils"

const AccountSetupSection = () => {
  const [{ currentUser }] = useAppData()
  const passwordResetFormRef = createRef<HTMLFormElement>()
  const router = useRouter()

  const handleReset = async (
    firstPassword: string
  ): Promise<HandlerResponse> => {
    try {
      await updatePassword(currentUser!, firstPassword)
      passwordResetFormRef.current?.reset()
      router.push(oneLevelUp(SUCCESS_ROUTE))
      return { success: true, successMessage: "Password Set!" }
    } catch {
      return { success: false, error: { message: "Something Went Wrong" } }
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <PasswordSetupForm
        formRef={passwordResetFormRef}
        passwordSetUpHandler={handleReset}
      />
      <div>
        <Button
          className="h-1/2 w-1/2"
          onClick={() => passwordResetFormRef.current?.requestSubmit()}
        >
          Set Password
        </Button>
      </div>
    </div>
  )
}

export default AccountSetupSection

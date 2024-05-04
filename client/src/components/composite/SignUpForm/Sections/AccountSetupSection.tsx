import { createRef } from "react"
import { updatePassword } from "firebase/auth"
import { useAppData } from "store/store"
import Button from "components/generic/FigmaButtons/FigmaButton"

import {
  PasswordSetup,
  HandlerResponse
} from "components/generic/PasswordSetup/PasswordSetup"

const AccountSetupSection = () => {
  const [{ currentUser }] = useAppData()
  const passwordResetFormRef = createRef<HTMLFormElement>()

  const handleReset = async (
    firstPassword: string
  ): Promise<HandlerResponse> => {
    try {
      await updatePassword(currentUser!, firstPassword)
      passwordResetFormRef.current?.reset()
      return { success: true, successMessage: "Password Set!" }
    } catch (e) {
      return { success: false, error: { message: "Something Went Wrong" } }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PasswordSetup
        formRef={passwordResetFormRef}
        passwordSetUpHandler={handleReset}
      />
      <div>
        <Button
          className=""
          onClick={() => passwordResetFormRef.current?.requestSubmit()}
        >
          Set Password
        </Button>
      </div>
    </div>
  )
}

export default AccountSetupSection

import { createRef } from "react"
import { updatePassword } from "firebase/auth"
import { useAppData } from "store/Store"
import Button from "components/generic/FigmaButtons/FigmaButton"

import {
  PasswordSetupForm,
  HandlerResponse
} from "components/generic/PasswordSetupForm/PasswordSetupForm"
import { useNavigate } from "react-router-dom"
import { oneLevelUp } from "../utils/Utils"
import { SUCCESS_ROUTE } from "../utils/RouteNames"

const AccountSetupSection = () => {
  const [{ currentUser }] = useAppData()
  const passwordResetFormRef = createRef<HTMLFormElement>()
  const navigate = useNavigate()

  const handleReset = async (
    firstPassword: string
  ): Promise<HandlerResponse> => {
    try {
      await updatePassword(currentUser!, firstPassword)
      passwordResetFormRef.current?.reset()
      navigate(oneLevelUp(SUCCESS_ROUTE))
      return { success: true, successMessage: "Password Set!" }
    } catch (e) {
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
        <h5 className="mt-3">
          You may skip this step by clicking "next" if you have already set your
          password with the link sent to <strong>{currentUser?.email}</strong>
        </h5>
      </div>
    </div>
  )
}

export default AccountSetupSection

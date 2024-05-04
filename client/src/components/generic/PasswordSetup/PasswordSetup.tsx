/*
import { updatePassword } from "firebase/auth"

updatePassword().then(()=>{

}).catch((error)=>{

}) */

import TextInput from "../TextInputComponent/TextInput"

export const PasswordSetup = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p>Password</p>
        <TextInput className="rounded" />
      </div>
      <div>
        <p>Confirm password</p>
        <TextInput className="rounded" />
      </div>
      <p>You can reset your password at any time.</p>
    </div>
  )
}

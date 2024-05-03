/*
import { updatePassword } from "firebase/auth"

updatePassword().then(()=>{

}).catch((error)=>{

}) */

import TextInput from "../TextInputComponent/TextInput"

export const PasswordSetup = () => {
  return (
    <div className="flex flex-col gap-5 pl-10">
      <div>
        <p>Password</p>
        <TextInput className="max-w-[346px] rounded" />
      </div>
      <div>
        <p>Confirm password</p>
        <TextInput className="max-w-[346px] rounded" />
      </div>
      <p>You can reset your password at any time.</p>
    </div>
  )
}

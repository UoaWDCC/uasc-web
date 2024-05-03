/*
import { updatePassword } from "firebase/auth"

updatePassword().then(()=>{

}).catch((error)=>{

}) */

import TextInput from "../TextInputComponent/TextInput"

export const PasswordSetup = () => {
  return (
    <div className="flex flex-col">
      <div>
        <p>Password</p>
        <TextInput className="w-[346px]" data-testid="" />
        <p>Confirm password</p>
        <TextInput className="w-[346px]" data-testid="" />
      </div>
    </div>
  )
}

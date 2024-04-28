import {
  PAGE_CONTENT,
  PAGINATED_FORM_PAGES
} from "components/composite/SignUpForm/PageConfig/PageConfig"
import { ProtectedSignUpForm } from "components/composite/SignUpForm/SignUpForm"
import FullPageBackgroundImage from "components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useSignUpUserMutation } from "services/User/UserMutations"
import { useSignUpFormData } from "store/signupform"

const Register = () => {
  const navigateFn = useNavigate()
  const [signUpFormData] = useSignUpFormData()

  const { email, ...user } = signUpFormData
  const { mutate, isPending } = useSignUpUserMutation({
    email: email || "",
    user
  })

  const pages = PAGINATED_FORM_PAGES(navigateFn!, mutate, isPending)
  const pageContent = PAGE_CONTENT

  return (
    <>
      <FullPageBackgroundImage>
        <span className="absolute bottom-0 left-1/2 h-fit w-full -translate-x-1/2 sm:fixed">
          <Routes>
            <Route index element={<Navigate to={"personal_1"} replace />} />
            <Route
              path=":step"
              element={
                <ProtectedSignUpForm pageContent={pageContent} pages={pages} />
              }
            />
          </Routes>
        </span>
      </FullPageBackgroundImage>
    </>
  )
}

export default Register

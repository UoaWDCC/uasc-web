import {
  PAGE_CONTENT,
  PAGINATED_FORM_PAGES
} from "components/composite/SignUpForm/PageConfig/PageConfig"
import { ProtectedSignUpForm } from "components/composite/SignUpForm/SignUpForm"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

const Register = () => {
  const navigateFn = useNavigate()
  const pages = PAGINATED_FORM_PAGES(navigateFn!)
  const pageContent = PAGE_CONTENT
  return (
    <>
      <div>
        <span className="fixed bottom-0 left-1/2 w-full -translate-x-1/2">
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
      </div>
    </>
  )
}

export default Register

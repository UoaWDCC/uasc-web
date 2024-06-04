import { DateSelectionProvider } from "components/composite/Admin/AdminAvailabilityView/DateSelectionContext"
import WrappedAdminAvailabilityView from "components/composite/Admin/AdminAvailabilityView/WrappedAdminAvailabilityView"
import WrappedAdminMemberView from "components/composite/Admin/AdminMemberView/ProtectedAdminMemberView"
import AdminNavbar from "components/composite/Admin/AdminNavbar/AdminNavbar"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAppData } from "store/Store"

const Heading = ({ title }: { title: string }) => (
  <h2 className="text-dark-blue-100 self-start italic">{title}</h2>
)
const Admin = () => {
  const [{ currentUserClaims }] = useAppData()

  if (!currentUserClaims?.admin) {
    return <Navigate to="/" />
  }
  return (
    <>
      <AdminNavbar />
      <div
        className="bg-mountain-background-image relative z-10 flex min-h-[100vh] w-full
      flex-col items-center bg-cover bg-top bg-no-repeat"
      >
        <div className="bg-gray-1 pointer-events-none absolute -z-30 h-full w-full opacity-70" />
        <div className="z-20 flex w-full max-w-[1200px] flex-col items-center pb-8 pt-16">
          <Routes>
            <Route index element={<Navigate to="members" />} />
            <Route
              path="members"
              element={
                <>
                  <Heading title="Members" />
                  <WrappedAdminMemberView />
                </>
              }
            />
            <Route
              path="availability"
              element={
                <>
                  <Heading title="Booking Availability" />
                  <DateSelectionProvider>
                    <WrappedAdminAvailabilityView />
                  </DateSelectionProvider>
                </>
              }
            />
            {/* TODO: Implement Bookings view for admin */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Admin

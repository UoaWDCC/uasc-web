import { BrowserRouter } from "react-router-dom"
import queryClient from "services/QueryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { AllRoutes } from "./routes/routes"
import { AppNavbar } from "components/composite/Navbar/AppNavbar"
import { ErrorBoundary } from "react-error-boundary"
import RefreshNotification from "pages/RefreshNotification/RefreshNotification"
import { fireAnalytics } from "firebase"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppNavbar />
        <div className="pt-[51px]">
          <ErrorBoundary
            fallback={<RefreshNotification />}
            onError={() => {
              fireAnalytics("exception", { event_label: "uncaught exception" })
              window.location.reload()
            }}
          >
            <AllRoutes />
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

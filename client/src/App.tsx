import { BrowserRouter } from "react-router-dom"
import queryClient from "services/QueryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { AllRoutes } from "./routes/routes"
import { AppNavbar } from "components/composite/Navbar/AppNavbar"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppNavbar />
        <div className="pt-[51px]">
          <AllRoutes />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

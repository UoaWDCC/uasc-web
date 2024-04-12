import { Router } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import queryClient from "services/QueryClient"
import theme from "theme"
import { QueryClientProvider } from "@tanstack/react-query"
import { AllRoutes } from "./routes/routes"
import { AppNavbar } from "components/composite/Navbar/AppNavbar"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Router>
            <AppNavbar />
            <div className="pt-14">
              <AllRoutes />
            </div>
          </Router>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App

import { BrowserRouter } from "react-router-dom"
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
          <BrowserRouter>
            <AppNavbar />
            <div className="pt-[51px]">
              <AllRoutes />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App

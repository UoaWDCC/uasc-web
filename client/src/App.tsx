import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import queryClient from "services/QueryClient"
import theme from "theme"
import { QueryClientProvider } from "@tanstack/react-query"
import { AllRoutes, RouteProps } from "./routes/routes"
import { AppNavbar } from "components/composite/Navbar/AppNavbar"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Router>
            <AppNavbar />
            <div className="pt-14">
              <Routes>
                {AllRoutes.map((routeDetails: RouteProps, index: number) => (
                  <Route
                    key={index}
                    path={routeDetails.path}
                    element={routeDetails.element}
                  />
                ))}
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App

import Navbar from "components/composite/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import queryClient from "services/QueryClient"
import theme from "theme"
import { QueryClientProvider } from "@tanstack/react-query"
import { AllRoutes, RouteProps } from "./routes/routes"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="h-screen">
          <ThemeProvider theme={theme}>
            <Router>
              <div className="h-full">
                <Navbar />
                <div className="content" style={{ height: "100%" }}>
                  <Routes>
                    {AllRoutes.map(
                      (routeDetails: RouteProps, index: number) => (
                        <Route
                          key={index}
                          path={routeDetails.path}
                          element={routeDetails.element}
                        />
                      )
                    )}
                  </Routes>
                </div>
              </div>
            </Router>
          </ThemeProvider>
        </div>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App

import { createTheme } from "@mui/material"

export default createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#2f3336",
      secondary: "#2f3336cc",
      disabled: "#2f333680",
    },
    secondary: {
      main: "#ff9b00",
    },
    buttonPrimary: {
      main: "#54B3E5",
      contrastText: "#fff",
    },
  },
})

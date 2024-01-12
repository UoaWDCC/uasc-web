import { createTheme } from "@mui/material"
export default createTheme({
  palette: {
    common: {
      black: "#000",
      grey: "#A8ADB0",
      darkGrey: "#474747",
      white: "#fff",
    },
    primary: {
      main: "#81C7EB", // Blue color 1
      secondary: "#54B3E5", // Blue color 2
      tertiary: "#51A1DD", // Blue color 3
      quaternary: "#457CC4", // Blue color 4
    },
    secondary: {
      main: "#BD8FFF", // Purple color 1
      secondary: "#8966FF", // Purple color 2
    },
    buttonPrimary: {
      main: "#54B3E5",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
})

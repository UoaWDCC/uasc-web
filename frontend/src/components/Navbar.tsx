import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Typography, Stack, Link, Box, AppBar } from "@mui/material"
import { auth } from "../firebase"

const Navbar = () => {
  const homeLocation = "/"
  const pageLocation = useLocation().pathname
  const onHomePage = pageLocation === homeLocation
  const [isVisible, setIsVisible] = useState(!onHomePage)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // State for login status

  useEffect(() => {
    if (!onHomePage) {
      setIsVisible(true)
      return
    }

    setIsVisible(false)

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const proportionOfWindowHeight = window.innerHeight * 0.3
      currentScrollPos > proportionOfWindowHeight
        ? setIsVisible(true)
        : setIsVisible(false)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [onHomePage])

  // const handleLogin = () => {
  //   setIsLoggedIn(true)
  // }

  const handleLogout = async () => {
    setIsLoggedIn(false)
    try {
      await auth.signOut()
    } catch (error) {
      console.error("Failed to sign out: ", error)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffffff50",
          opacity: isVisible ? "1" : "0",
          pointerEvents: isVisible ? "auto" : "none",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            paddingX: "32px",
            paddingY: "8px",
          }}
        >
          <Stack direction="row" alignItems="center">
            {/* <img
            src="https://uasc.co.nz/wp-content/uploads/2021/05/UASC-LOGO-White.png"
            alt="logo"
            style={{ width: "48px", height: "48px" }}
          /> */}
            <Typography
              variant="h3"
              align="left"
              color="primary.quaternary"
              sx={{ fontWeight: "bold" }}
            >
              UASC
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center">
            <Link
              href="/"
              variant="h6"
              underline="none"
              color="common.darkGrey"
            >
              Home
            </Link>
            <Link
              href="/about"
              variant="h6"
              underline="none"
              color="common.darkGrey"
            >
              About
            </Link>
            <Link
              href="/events"
              variant="h6"
              underline="none"
              color="common.darkGrey"
            >
              Events
            </Link>
            <Link
              href="/contact"
              variant="h6"
              underline="none"
              color="common.darkGrey"
            >
              Contact
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/booking"
                  variant="h6"
                  underline="none"
                  color="common.darkGrey"
                >
                  Bookings
                </Link>
                <Link
                  href="/profile"
                  variant="h6"
                  underline="none"
                  color="common.darkGrey"
                >
                  Profile
                </Link>
                {/* @ts-ignore */}
                <Typography
                  variant="h6"
                  underline="none"
                  color="common.darkGrey"
                  onClick={handleLogout}
                >
                  Logout
                </Typography>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  variant="h6"
                  underline="none"
                  color="common.darkGrey"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  variant="h6"
                  underline="none"
                  color="common.darkGrey"
                >
                  Login
                </Link>
              </>
            )}
          </Stack>
        </Stack>
      </AppBar>
    </Box>
  )
}

export default Navbar

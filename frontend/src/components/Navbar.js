import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./Navbar.css" // Import the CSS file for styling
import { Typography, Stack, Link } from "@mui/material"

const navbarStyles = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "lightblue",
  position: "fixed",
  top: 0,
  width: "100%",
  transition: "opacity 0.5s ease-in-out",
}

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

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <nav
      className="navbar"
      style={
        (isVisible
          ? { ...navbarStyles, opacity: "1" }
          : { ...navbarStyles, opacity: "0", pointerEvents: "none" },
        { zIndex: "1000", position: "fixed", width: "100%" })
      }
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          paddingX: "32px",
          paddingY: "8px",
          backgroundColor: "#ffffff40",
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
          <Link href="/" variant="h6" underline="none" color="common.darkGrey">
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
    </nav>
  )
}

export default Navbar

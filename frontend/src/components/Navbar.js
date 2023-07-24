import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Navbar.css" // Import the CSS file for styling

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
  const [isLoggedIn, setIsLoggedIn] = useState(false) // State for login status

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

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <nav
      className="navbar"
      style={
        isVisible
          ? { ...navbarStyles, opacity: "1" }
          : { ...navbarStyles, opacity: "0", pointerEvents: "none" }
      }
    >
      <div id="zero" style={{ display: "flex" }}>
        <div id="one">
          <img
            src="https://uasc.co.nz/wp-content/uploads/2021/05/UASC-LOGO-White.png"
            alt="logo"
          />
        </div>
        <div id="two">
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/events">Events</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <a href="/bookings">Bookings</a>
                </li>
                <li>
                  <a href="/profile">My Profile</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/register">Register</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

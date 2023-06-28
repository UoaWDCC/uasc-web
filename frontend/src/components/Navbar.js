import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navbarStyles = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "lightblue",
  position: "fixed",
  top: 0,
  width: "100%",
  transition: "opacity 0.5s ease-in-out",
};

const Navbar = () => {
  const homeLocation = "/";
  const pageLocation = useLocation().pathname;
  const onHomePage = pageLocation === homeLocation;
  const [isVisible, setIsVisible] = useState(!onHomePage);

  useEffect(() => {
    if (!onHomePage) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const proportionOfWindowHeight = window.innerHeight * 0.3;
      currentScrollPos > proportionOfWindowHeight
        ? setIsVisible(true)
        : setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageLocation]);

  return (
    <nav
      className="navbar"
      style={
        isVisible
          ? { ...navbarStyles, opacity: "1" }
          : { ...navbarStyles, opacity: "0", pointerEvents: "none" }
      }
    >
      <h1> UASC </h1>
      <div className="links" style={{ display: "flex" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/booking">Booking</Link>
      </div>
    </nav>
  );
};

export default Navbar;

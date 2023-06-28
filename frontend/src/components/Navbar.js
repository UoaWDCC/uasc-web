import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

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
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const navbarHeight = navRef.current.getBoundingClientRect().height;
      currentScrollPos > navbarHeight
        ? setIsVisible(true)
        : setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);

    // remove event listener after effect has run and before component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar"
      style={
        isVisible
          ? { ...navbarStyles, opacity: "1" }
          : { ...navbarStyles, opacity: "0" }
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
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <div id="zero" style={{ display: "flex" }}>	
        <div id="one">
          <img src="https://uasc.co.nz/wp-content/uploads/2021/05/UASC-LOGO-White.png" alt="logo"/>
        </div>
        <div id="two">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#events">Events</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <a href="#bookings">Bookings</a>
                </li>
                <li>
                  <a href="#profile">My Profile</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="#register">Register</a>
                </li>
                <li>
                  <a href="#login">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
